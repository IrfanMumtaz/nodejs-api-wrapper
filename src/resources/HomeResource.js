const BaseResource = require(`@resources/BaseResource`);

class HomeResource extends BaseResource{

    
    static setData(data) {
        return {
            "id": data.id,
            "name": data.name,
        }
    }
}

module.exports = HomeResource