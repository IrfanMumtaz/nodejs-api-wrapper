const cron = require('node-cron');

class SampleCron {

    constructor() { 
        this.schedule = "* * * * *"
        this.call()
    }
    
    execute() {
        console.log(`[${new Date().toISOString()}] Running SampleCron`);
    }

    call() {
        cron.schedule(this.schedule, () => this.execute());
    }
}

module.exports = SampleCron;