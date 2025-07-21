class ErrorResource {
  constructor({ error = {}, message = '', data = {} } = {}) {
    this.data = data;
    this.error = error;
    this.success = false;
    this.message = message;
  }
}

module.exports = ErrorResource; 