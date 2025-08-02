import rabbitMQ from '../config/Rabbitmq';
import { ConsumeMessage } from 'amqplib';
import Logger from '../config/Logger';

interface MessageData {
  [key: string]: unknown;
}

class Example {
  private rabbitMQ = rabbitMQ;
  private readonly queueName: string = 'test-queue';

  constructor() {
    this.receiveMessages();
  }

  async receiveMessages(): Promise<void> {
    await this.rabbitMQ.consumeQueue(
      this.queueName,
      async (message: MessageData, msg: ConsumeMessage) => {
        Logger.info(`Received message: ${JSON.stringify(message)}`);

        // Process the message here
        // ... your business logic ...

        // Acknowledge the message
        await this.rabbitMQ.acknowledgeMessage(msg);
      }
    );
  }
}

export default new Example();
