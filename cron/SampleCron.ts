import cron from 'node-cron';
import Logger from '../config/Logger';

interface CronSchedule {
  schedule: string;
  execute(): void;
  call(): void;
}

class SampleCron implements CronSchedule {
  public readonly schedule: string = '* * * * *';

  constructor() {
    this.call();
  }

  execute(): void {
    Logger.info(`[${new Date().toISOString()}] Running SampleCron`);
  }

  call(): void {
    cron.schedule(this.schedule, () => this.execute());
  }
}

export default SampleCron;
