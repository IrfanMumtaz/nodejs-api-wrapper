const ResponseException = require(`@exceptions/ResponseException`)

class BaseResource{
    
    constructor(data) {

        if (data instanceof Array) {
            if (this.constructor.wrap) {
                this[this.constructor.wrap] = data.map((item) => this.constructor.setData(item));
            }
            else {
                return data.map((item) => this.constructor.setData(item));
            }
        }
        else if (data instanceof Object) {
            if (this.constructor.wrap) {
                this[this.constructor.wrap] = this.constructor.setData(data);
            }
            else {
                return this.constructor.setData(data);
            }
        }
        else {
            throw ResponseException.dataTypeMismatch("This operation requires data type to be Object or Array.")
        }
    }
}

module.exports = BaseResource;