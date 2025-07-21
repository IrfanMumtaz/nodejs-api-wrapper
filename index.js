const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
global.__src = `${__dirname}/src`;

const app = express();
const port = process.env.APP_PORT || 3000;

const apiRouter = require('./routes/api');
app.use('/api', apiRouter);

// app.use((req, res, next) => {
//     throw new Error("not found");
    
// });

const ErrorHandler = require('./src/exceptions/ErrorHandler');
app.use(ErrorHandler.routeNotFound)
app.use(ErrorHandler.handle);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
}); 