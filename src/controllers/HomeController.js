const Controller = require(`@controllers/Controller`);
const SampleException = require(`@exceptions/SampleException`);
const HomeResource = require(`@resources/HomeResource`);
const User = require("@models/User")

class HomeController extends Controller {

    async getCollectionResponse(req, res) {
        
        const users = await User.query().get();

        return this.response(res, new HomeResource(users));
    }
    
    async getSingleResponse(req, res) {
        const user = new User({
            name: req.body.name
        })

        await user.save();
        return this.response(res, new HomeResource(user), 201);
    }
    
    getErrorResponse(req, res) {
        throw SampleException.sample('Test Exception');
        
    }
}

module.exports = HomeController; 