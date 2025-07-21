const SuccessResource = require("./SuccessResource");
const BaseResource = require(`${__src}/resources/BaseResource`);

class HomeResource extends BaseResource{

    
    static setData(data) {
        return {
            "id": data.id,
            "user": data.user,
            email: new SuccessResource({})
        }
    }
}

module.exports = HomeResource