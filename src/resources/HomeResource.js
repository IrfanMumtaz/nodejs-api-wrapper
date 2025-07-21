const BaseResource = require(`${__src}/resources/BaseResource`);

class HomeResource extends BaseResource{

    static wrap = 'home'
    
    static setData(data) {
        return {
            "id": data.id,
            "user": data.user
        }
    }
}

module.exports = HomeResource