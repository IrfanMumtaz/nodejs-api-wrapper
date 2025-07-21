const ValidationException = require("@exceptions/ValidationException");

class ValidationMiddleware{
    
    static validate(schema) {
        return (req, res, next) => {
            
            if (req.body === undefined) {
                throw ValidationException.validation("Missing or invalid fields")
            }

            const { error, value } = schema.validate(req.body, { abortEarly: false });
            if (error) {
                throw ValidationException.validation(error.details.map(e => e.message))
            }
            
            req.body = value;
            next();
        };
    }
} 

module.exports = ValidationMiddleware