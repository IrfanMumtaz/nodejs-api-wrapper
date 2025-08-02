import SampleCron from './SampleCron';

interface CronJob {
  execute(): void;
}

class CronRegistry {
  constructor() {
    this.register();
  }

  register(): CronJob[] {
    const cronJobs: CronJob[] = [new SampleCron()];

    return cronJobs;
  }
}

export default new CronRegistry();
