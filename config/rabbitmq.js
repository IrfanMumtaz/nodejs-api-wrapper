const amqp = require('amqplib');
const dotenv = require('dotenv');
dotenv.config();

class RabbitMQConnection {
    constructor() {
        this.connection = null;
        this.channel = null;
        this.isConnecting = false;
        this.maxRetries = 5;
        this.retryDelay = 5000; // 2 seconds
        
        
        // Get connection details from environment or use defaults
        this.config = {
            hostname: process.env.RABBITMQ_HOST,
            port: process.env.RABBITMQ_PORT,
            username: process.env.RABBITMQ_USER,
            password: process.env.RABBITMQ_PASS,
            vhost: process.env.RABBITMQ_VHOST
        };
        
        // Build connection URL
        this.connectionUrl = `amqp://${this.config.username}:${this.config.password}@${this.config.hostname}:${this.config.port}${this.config.vhost}`;
        
    }

    async connect(retryCount = 0) {
        if (this.isConnecting) {
            console.log('Connection already in progress, waiting...');
            return;
        }

        if (this.channel)
        {
            return this.channel;
        }

        try {
            this.isConnecting = true;
            
            this.connection = await amqp.connect(this.connectionUrl);
            
            console.log('RabbitMQ connected successfully');
            
            // Create channel
            this.channel = await this.connection.createChannel();
            console.log('RabbitMQ channel created');
            
            // Set up connection event handlers
            this.connection.on('error', (error) => {
                console.error('RabbitMQ connection error:', error.message);
                this.connection = null;
                this.channel = null;
            });
            
            this.connection.on('close', () => {
                console.log('RabbitMQ connection closed');
                this.connection = null;
                this.channel = null;
            });
            
            this.isConnecting = false;
            return this.channel;
            
        } catch (error) {
            this.isConnecting = false;
            console.error(`RabbitMQ connection error (attempt ${retryCount + 1}/${this.maxRetries}):`, error.message);
            
            if (retryCount < this.maxRetries - 1) {
                console.log(`Retrying in ${this.retryDelay}ms...`);
                await new Promise(resolve => setTimeout(resolve, this.retryDelay));
                return this.connect(retryCount + 1);
            } else {
                console.error('Max retries reached. RabbitMQ connection failed.');
                throw error;
            }
        }
    }

    async ensureConnection() {
        if (!this.connection || !this.channel) {
            await this.connect();
        }
        return this.channel;
    }

    async createQueue(queueName, options = {}) {
        try {
            const channel = await this.ensureConnection();
            
            await channel.assertQueue(queueName, {
                durable: true, // Queue survives broker restart
                ...options
            });
            
            console.log(`Queue '${queueName}' created/verified`);
            return channel;
        } catch (error) {
            console.error(`Error creating queue '${queueName}':`, error.message);
            throw error;
        }
    }

    async sendToQueue(queueName, message, options = {}) {
        try {
            const channel = await this.ensureConnection();
            
            const messageBuffer = Buffer.isBuffer(message) ? message : Buffer.from(JSON.stringify(message));
            
            const result = channel.sendToQueue(queueName, messageBuffer, {
                persistent: true, // Message survives broker restart
                ...options
            });
            
            console.log(`Message sent to queue '${queueName}'`);
            return result;
        } catch (error) {
            console.error(`Error sending message to queue '${queueName}':`, error.message);
            throw error;
        }
    }

    async consumeQueue(queueName, callback, options = {}) {
        try {
            const channel = await this.ensureConnection();
            
            await channel.assertQueue(queueName, { durable: true });
            
            console.log(`Starting to consume from queue '${queueName}'`);
            
            return channel.consume(queueName, (msg) => {
                if (msg) {
                    try {
                        const content = JSON.parse(msg.content.toString());
                        callback(content, msg);
                    } catch (error) {
                        console.error('Error processing message:', error.message);
                        // Reject the message
                        channel.nack(msg, false, false);
                    }
                }
            }, {
                noAck: false, // Manual acknowledgment
                ...options
            });
        } catch (error) {
            console.error(`Error consuming from queue '${queueName}':`, error.message);
            throw error;
        }
    }

    async acknowledgeMessage(msg) {
        if (this.channel && msg) {
            this.channel.ack(msg);
        }
    }

    async rejectMessage(msg, requeue = false) {
        if (this.channel && msg) {
            this.channel.nack(msg, false, requeue);
        }
    }

    async close() {
        try {
            if (this.channel) {
                await this.channel.close();
                console.log('RabbitMQ channel closed');
            }
            
            if (this.connection) {
                await this.connection.close();
                console.log('RabbitMQ connection closed');
            }
        } catch (error) {
            console.error('Error closing RabbitMQ connection:', error.message);
        }
    }

    // Health check method
    async isConnected() {
        return this.connection && this.connection.connection && this.connection.connection.state === 'open';
    }
}

// Create singleton instance
const rabbitMQ = new RabbitMQConnection();

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('Closing RabbitMQ connection...');
    await rabbitMQ.close();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    console.log('Closing RabbitMQ connection...');
    await rabbitMQ.close();
    process.exit(0);
});

module.exports = rabbitMQ;

