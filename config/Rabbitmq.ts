import amqp, { Channel, ConsumeMessage } from 'amqplib';
import dotenv from 'dotenv';
import Logger from './Logger';

dotenv.config();

interface RabbitMQConfig {
  hostname: string;
  port: number;
  username: string;
  password: string;
  vhost: string;
}

interface QueueOptions {
  durable?: boolean;
  [key: string]: unknown;
}

interface MessageOptions {
  persistent?: boolean;
  [key: string]: unknown;
}

interface ConsumeOptions {
  noAck?: boolean;
  [key: string]: unknown;
}

// RabbitMQConnectionConfig interface removed as it was unused

class RabbitMQConnection {
  private connection: any = null;
  private channel: Channel | null = null;
  private isConnecting: boolean = false;
  private readonly maxRetries: number = 5;
  private readonly retryDelay: number = 5000;

  private readonly config: RabbitMQConfig;
  private readonly connectionUrl: string;

  constructor() {
    // Get connection details from environment or use defaults
    this.config = {
      hostname: process.env.RABBITMQ_HOST || 'localhost',
      port: parseInt(process.env.RABBITMQ_PORT || '5672'),
      username: process.env.RABBITMQ_USER || 'guest',
      password: process.env.RABBITMQ_PASS || 'guest',
      vhost: process.env.RABBITMQ_VHOST || '/',
    };

    // Build connection URL
    this.connectionUrl = `amqp://${this.config.username}:${this.config.password}@${this.config.hostname}:${this.config.port}${this.config.vhost}`;
  }

  async connect(retryCount: number = 0): Promise<Channel> {
    if (this.isConnecting) {
      Logger.info('Connection already in progress, waiting...');
      return this.channel!;
    }

    if (this.channel) {
      return this.channel;
    }

    try {
      this.isConnecting = true;

      this.connection = await amqp.connect(this.connectionUrl);

      Logger.info('RabbitMQ connected successfully');

      // Create channel
      if (this.connection) {
        this.channel = await this.connection.createChannel();
        Logger.info('RabbitMQ channel created');

        // Set up connection event handlers
        this.connection.on('error', (error: Error) => {
          Logger.error(`RabbitMQ connection error: ${error.message}`);
          this.connection = null;
          this.channel = null;
        });

        this.connection.on('close', () => {
          Logger.info('RabbitMQ connection closed');
          this.connection = null;
          this.channel = null;
        });
      }

      this.isConnecting = false;
      return this.channel!;
    } catch (error) {
      this.isConnecting = false;
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      Logger.error(
        `RabbitMQ connection error (attempt ${retryCount + 1}/${this.maxRetries}): ${errorMessage}`
      );

      if (retryCount < this.maxRetries - 1) {
        Logger.info(`Retrying in ${this.retryDelay}ms...`);
        await new Promise(resolve => setTimeout(resolve, this.retryDelay));
        return this.connect(retryCount + 1);
      } else {
        Logger.error('Max retries reached. RabbitMQ connection failed.');
        throw error;
      }
    }
  }

  async ensureConnection(): Promise<Channel> {
    if (!this.connection || !this.channel) {
      await this.connect();
    }
    return this.channel!;
  }

  async createQueue(
    queueName: string,
    options: QueueOptions = {}
  ): Promise<Channel> {
    try {
      const channel = await this.ensureConnection();

      await channel.assertQueue(queueName, {
        durable: true, // Queue survives broker restart
        ...options,
      });

      Logger.info(`Queue '${queueName}' created/verified`);
      return channel;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      Logger.error(`Error creating queue '${queueName}': ${errorMessage}`);
      throw error;
    }
  }

  async sendToQueue(
    queueName: string,
    message: string | Buffer | Record<string, unknown>,
    options: MessageOptions = {}
  ): Promise<boolean> {
    try {
      const channel = await this.ensureConnection();

      const messageBuffer = Buffer.isBuffer(message)
        ? message
        : Buffer.from(JSON.stringify(message));

      const result = channel.sendToQueue(queueName, messageBuffer, {
        persistent: true, // Message survives broker restart
        ...options,
      });

      Logger.info(`Message sent to queue '${queueName}'`);
      return result;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      Logger.error(
        `Error sending message to queue '${queueName}': ${errorMessage}`
      );
      throw error;
    }
  }

  async consumeQueue(
    queueName: string,
    callback: (content: Record<string, unknown>, msg: ConsumeMessage) => void,
    options: ConsumeOptions = {}
  ): Promise<amqp.Replies.Consume> {
    try {
      const channel = await this.ensureConnection();

      await channel.assertQueue(queueName, { durable: true });

      Logger.info(`Starting to consume from queue '${queueName}'`);

      return channel.consume(
        queueName,
        (msg: ConsumeMessage | null) => {
          if (msg) {
            try {
              const content = JSON.parse(msg.content.toString());
              callback(content, msg);
            } catch (error) {
              const errorMessage =
                error instanceof Error ? error.message : 'Unknown error';
              Logger.error(`Error processing message: ${errorMessage}`);
              // Reject the message
              channel.nack(msg, false, false);
            }
          }
        },
        {
          noAck: false, // Manual acknowledgment
          ...options,
        }
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      Logger.error(
        `Error consuming from queue '${queueName}': ${errorMessage}`
      );
      throw error;
    }
  }

  async acknowledgeMessage(msg: ConsumeMessage): Promise<void> {
    if (this.channel && msg) {
      this.channel.ack(msg);
    }
  }

  async rejectMessage(
    msg: ConsumeMessage,
    requeue: boolean = false
  ): Promise<void> {
    if (this.channel && msg) {
      this.channel.nack(msg, false, requeue);
    }
  }

  async close(): Promise<void> {
    try {
      if (this.channel) {
        await this.channel.close();
        Logger.info('RabbitMQ channel closed');
      }

      if (this.connection) {
        await this.connection.close();
        Logger.info('RabbitMQ connection closed');
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      Logger.error(`Error closing RabbitMQ connection: ${errorMessage}`);
    }
  }

  // Health check method
  async isConnected(): Promise<boolean> {
    return !!(
      this.connection &&
      this.connection.connection &&
      this.connection.connection.state === 'open'
    );
  }
}

// Create singleton instance
const rabbitMQ = new RabbitMQConnection();

// Graceful shutdown
process.on('SIGINT', async () => {
  Logger.info('Closing RabbitMQ connection...');
  await rabbitMQ.close();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  Logger.info('Closing RabbitMQ connection...');
  await rabbitMQ.close();
  process.exit(0);
});

export default rabbitMQ;
