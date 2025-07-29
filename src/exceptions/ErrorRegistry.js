const RouteException = require(`@exceptions/RouteException`);
const ErrorResource = require(`@resources/ErrorResource`);
const Logger = require("@config/Logger");

class ErrorRegistry {
    constructor() {
        return this.register()
    }
    
    register() {
        return [
            this.badRoute,
            this.handle
        ]
    }
    handle(err, req, res, next) {
        Logger.error(err.stack);
        const response = new ErrorResource({
            error: {
                stack: process.env.APP_ENV === 'production' ? "Oops! Something went wrong." : err.stack,
                code: err.code || 500
            },
            message: err.message || 'Internal Server Error',
        });
        res.status(err.status || 500).json(response);
    }

    badRoute(req, res, next) {
        next(RouteException.badRoute());
    }

    

}

module.exports = new ErrorRegistry; 