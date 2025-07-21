const Controller = require(`${__src}/controllers/Controller`);
const SampleException = require(`${__src}/exceptions/SampleException`);
const HomeResource = require(`${__src}/resources/HomeResource`);

class HomeController extends Controller {

    getCollectionResponse(req, res) {
        return this.response(res, new HomeResource([{ id: 1, user: "irfan" }]));
    }
    
    getSingleResponse(req, res) {
        return this.response(res, new HomeResource({ id: 1, user: "irfan" }));
    }
    
    getErrorResponse(req, res) {
        throw SampleException.sample('Test Exception');
        
    }
}

module.exports = HomeController; 