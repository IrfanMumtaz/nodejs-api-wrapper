const Controller = require(`${__src}/controllers/Controller`);
const SampleException = require(`${__src}/exceptions/SampleException`);
const HomeResource = require(`${__src}/resources/HomeResource`);

class HomeController extends Controller {

    getCollectionResponse(req, res) {
        return res.json(new HomeResource([{id: 1, user: "irfan"}]))
    }
    
    getSingleResponse(req, res) {
        return res.json(new HomeResource({id: 1, user: "irfan", email: "irfan@gmail.com"}))
        
    }
    
    getErrorResponse(req, res) {
        throw SampleException.sample('Test Exception');
        
    }
}

module.exports = HomeController; 