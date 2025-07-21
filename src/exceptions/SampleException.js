const BaseException = require(`${__src}/exceptions/BaseException`);

class SampleException extends BaseException {

  constructor(message = 'Tesging', code = 422) {
    super(message, code, 400);
  }

  static sample(msg = null) {
    return new SampleException(msg || "Testing Exception")
  }
}

module.exports = SampleException; 