const ResponseException = require(`@exceptions/ResponseException`);

class BaseResource{
    
    constructor(data) {
        if (data instanceof Array) {
            return this.dataArray(data)
        }
        else if (data instanceof Object) {
            return this.dataObject(data)
        }
        else {
            throw ResponseException.dataTypeMismatch("This operation requires data type to be Object or Array.")
        }
    }

    dataArray(data) {
        if (this.constructor.wrap) {
            this[this.constructor.wrap] = data.map((item) => this.constructor.setData(item));
        }
        else {
            return data.map((item) => this.constructor.setData(item));
        }
    }

    dataObject(data) {
        if (this.constructor.wrap) {
            this[this.constructor.wrap] = this.constructor.setData(data);
        }
        else {
            return this.constructor.setData(data);
        }
    }
}

module.exports = BaseResource;