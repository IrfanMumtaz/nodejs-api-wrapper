const BaseException = require(`@exceptions/BaseException`);

class ResponseException extends BaseException {

    constructor(message = 'Data type mismatch', code = 500) {
        super(message, code, 500);
    }

    static dataTypeMismatch(msg = null) {
        return new ResponseException(msg || "Data type mismatch")
    }
    
}

module.exports = ResponseException; 