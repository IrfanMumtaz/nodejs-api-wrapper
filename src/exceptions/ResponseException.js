const BaseException = require(`${__src}/exceptions/BaseException`);

class ResponseException extends BaseException {

    constructor(message = 'Not Object', code = 500) {
        super(message, code, 500);
    }

    static notObject(msg = null) {
        return new ResponseException(msg || "Not Object")
    }
    
    static notArray(msg = null) {
        return new ResponseException(msg || "Not Array")
    }
}

module.exports = ResponseException; 