const RouteException = require(`@exceptions/RouteException`);
const ErrorResource = require(`@resources/ErrorResource`);

class ErrorHandler {
    static handle(err, req, res, next) {
        
        const response = new ErrorResource({
            error: {
                stack: process.env.APP_ENV === 'production' ? "Oops! Something went wrong." : err.stack,
                code: err.code || 500
            },
            message: err.message || 'Internal Server Error',
        });
        res.status(err.status || 500).json(response);
    }

    static badRoute(req, res, next) {
        next(RouteException.badRoute());
    }
}

module.exports = ErrorHandler; 