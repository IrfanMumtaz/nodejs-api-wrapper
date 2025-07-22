const Joi = require('joi');

const UserRequest = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
});

module.exports = UserRequest