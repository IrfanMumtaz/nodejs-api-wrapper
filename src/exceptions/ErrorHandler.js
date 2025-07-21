const ResponseError = require('../responses/ResponseError');

class ErrorHandler {
    static handle(err, req, res, next) {

        const response = new ResponseError({
            error: {
                name: err.name,
                stack: process.env.APP_ENV === 'production' ? "Oops! Something went wrong." : err.stack,
                code: err.code || 500
            },
        message: err.message || 'Internal Server Error',
        });
        res.status(err.status || 500).json(response);
  }
}

module.exports = ErrorHandler; 