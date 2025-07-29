const winston = require('winston');
require('winston-daily-rotate-file');

class Logger {
    constructor() {
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.combine(
                winston.format.timestamp(), // Add timestamp to logs
                winston.format.printf(({ timestamp, level, message }) => {
                return `${timestamp} ${level}: ${message}`;
                })
            ),
            transports: [
                this.dailyRotate()
            ]
        })
    }

    dailyRotate() {
        const dailyRotateFileTransport = new winston.transports.DailyRotateFile({
            filename: 'logs/%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true, 
            maxSize: '20m', 
            maxFiles: '14d'
        });

        return dailyRotateFileTransport;
    }

    info(message) {
        this.logger.info(message);
    }

    error(message) {
        this.logger.error(message);
    }
    
}

module.exports = new Logger;