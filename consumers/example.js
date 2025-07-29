const rabbitMQ = require('../config/Rabbitmq');

class Example{
    constructor() {
        this.rabbitMQ = rabbitMQ;
        this.queueName = 'test-queue';
        this.receiveMessages(); 
    }

    async receiveMessages() {
        await this.rabbitMQ.consumeQueue(this.queueName, async (message, msg) => {
            console.log('Received message:', message);
            
            // Process the message here
            // ... your business logic ...
            
            // Acknowledge the message
            await rabbitMQ.acknowledgeMessage(msg);
        });
    }
}

module.exports = new Example;