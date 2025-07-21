const ResponseException = require(`${__src}/exceptions/ResponseException`)

class BaseResource{
    static wrap = 'data';
    
    constructor(data) {

        if (data instanceof Array) {
            this[this.constructor.wrap] = data.map((item) => this.constructor.setData(item));
        }
        else if (data instanceof Object) {
            this[this.constructor.wrap] = this.constructor.setData(data);
        }
        else {
            throw ResponseException.notObject("This operation requires data type to be Object.")
        }
    }
}

module.exports = BaseResource;