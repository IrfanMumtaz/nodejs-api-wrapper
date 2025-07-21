const Controller = require(`${__src}/controllers/Controller`);
const SampleException = require(`${__src}/exceptions/SampleException`);

class HomeController extends Controller {
  constructor() {
    super();
  }

  getSampleResponse(req, res) {
    throw SampleException.sample('Sample not found');
  }
}

module.exports = HomeController; 