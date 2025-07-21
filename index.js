const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
global.__src = `${__dirname}/src`;

const app = express();
app.use(express.json());


const apiRouter = require('./routes/api');
app.use('/api', apiRouter);


const ErrorHandler = require(`${__src}/exceptions/ErrorHandler`);
app.use(ErrorHandler.routeNotFound)
app.use(ErrorHandler.handle);

const port = process.env.APP_PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
}); 