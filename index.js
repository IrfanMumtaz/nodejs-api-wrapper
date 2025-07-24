const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

require('module-alias/register');
require('@config/db')

// remove comment from CronRegistry to enable cron jobs
// require('@cron/CronRegistry');

const app = express();
app.use(express.json());

const registry = require(`./Registry`);
registry.routes(app);
registry.errors(app);

const port = process.env.APP_PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`, `(${(new Date()).toString()})`);
}); 