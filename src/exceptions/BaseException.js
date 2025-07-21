class BaseException extends Error {

  constructor(message = 'BaseException', code = 500, status = 500) {
    super(message);
    this.name = 'Exception';
    this.code = code;
    this.status = status;
  }

}

module.exports = BaseException; 