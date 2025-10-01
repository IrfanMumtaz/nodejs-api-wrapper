const Controller = require(`@controllers/Controller`);
const SampleException = require(`@exceptions/SampleException`);
const HomeResource = require(`@resources/HomeResource`);
const UserService = require("@services/UserService");

class HomeController extends Controller {

    async getCollectionResponse(req, res) {
        
        const users = await UserService.getAll();

        return this.response(res, new HomeResource(users));
    }
    
    async getSingleResponse(req, res) {
        const user = await UserService.create({
            name: req.body.name
        });

        return this.response(res, new HomeResource(user), 201);
    }
    
    getErrorResponse(req, res) {
        throw SampleException.sample('Test Exception');
        
    }
}

module.exports = HomeController; 