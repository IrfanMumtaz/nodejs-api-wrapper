const { sutando } = require('sutando');

sutando.addConnection({
    client: process.env.DB_CONNECTION,
    connection: {
        host : process.env.DB_HOST,
        port : process.env.DB_PORT,
        user : process.env.DB_USER,
        password : process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        ssl: process.env.PGSSL === 'true' ? { rejectUnauthorized: false } : false,
    },
});