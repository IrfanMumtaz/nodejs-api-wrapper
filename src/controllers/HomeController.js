const Controller = require('./Controller');
const SampleException = require('../exceptions/SampleException');

class HomeController extends Controller {
  constructor() {
    super();
  }

  getSampleResponse(req, res) {
    throw SampleException.sample('Sample not found');
  }
}

module.exports = HomeController; 