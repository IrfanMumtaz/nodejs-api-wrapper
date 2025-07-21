class SampleException extends Error {

  constructor(message = 'Tesging', code = 422) {
    super(message);
    this.name = 'Sample Exception';
    this.code = code;
    this.status = 400;
  }

  static sample() {
    return new SampleException("Testing Exception")
  }
}

module.exports = SampleException; 