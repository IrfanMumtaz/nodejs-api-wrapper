const SampleCron = require('@cron/SampleCron');

class CronRegistry{
    constructor(){
        this.register()
    }

    register(){
        const cronJobs = [
            new SampleCron
        ];

        return cronJobs;
    }
}

module.exports = new CronRegistry;