const BaseResource = require(`${__src}/resources/BaseResource`);

class SuccessResource extends BaseResource{

    
    static setData(data) {
        return {
            email: "irfan@gmail.com"
        }
    }
}

module.exports = SuccessResource