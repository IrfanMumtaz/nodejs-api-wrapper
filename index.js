const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

require('module-alias/register');
require('@config/db')

require('@cron/CronRegistry');

const app = express();
app.use(express.json());


const apiRouter = require('./routes/api');
app.use('/api', apiRouter);


const ErrorHandler = require(`@exceptions/ErrorHandler`);
app.use(ErrorHandler.badRoute)
app.use(ErrorHandler.handle);

const port = process.env.APP_PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
}); 