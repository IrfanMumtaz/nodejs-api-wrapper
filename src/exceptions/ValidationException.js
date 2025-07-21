const BaseException = require(`${__src}/exceptions/BaseException`);

class ValidationException extends BaseException {

  constructor(message = 'Validation Exception', code = 422) {
    super(message, code, 422);
  }

  static validation(msg = null) {
    return new ValidationException(msg || "Validation Exception")
  }
}

module.exports = ValidationException; 