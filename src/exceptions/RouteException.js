const BaseException = require(`@exceptions/BaseException`);

class RouteException extends BaseException {

    constructor(message = 'Route Exception', code = 400) {
        super(message, code, 400);
    }

    static badRoute(msg = null) {
        return new RouteException(msg || "Bad request, route does not exist")
    }
}

module.exports = RouteException; 