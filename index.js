const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

require('module-alias/register');
require('@config/db')

require('@cron/CronRegistry');

const app = express();
app.use(express.json());


const routeRegistry = require('@routes/RouteRegistry');
routeRegistry.forEach(route => {
    app.use(route.path, route.handler);
});

const errorRegistry = require(`@exceptions/ErrorRegistry`);
errorRegistry.forEach(handler => {
    app.use(handler);
});

const port = process.env.APP_PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
}); 