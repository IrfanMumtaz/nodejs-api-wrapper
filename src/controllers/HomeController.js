const Controller = require(`@controllers/Controller`);
const SampleException = require(`@exceptions/SampleException`);
const HomeResource = require(`@resources/HomeResource`);

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