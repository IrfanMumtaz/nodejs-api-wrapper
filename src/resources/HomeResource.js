const BaseResource = require(`@resources/BaseResource`);

class HomeResource extends BaseResource{

    
    static setData(data) {
        return {
            "id": data.id,
            "user": data.user,
        }
    }
}

module.exports = HomeResource