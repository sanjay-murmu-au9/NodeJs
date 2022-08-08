const __ = require('../../utilities/util/response.utils')
const Joi = require('joi');

const phoneNumberRegEx = /^[0-9]{10}$/

class UserValidator {
    async createUser(req, res, next) {
        const schema = Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            phoneNumber: Joi.string().regex(phoneNumberRegEx).optional(),
            location: Joi.string().optional(),
            profilePhoto: Joi.string().optional(),
            password: Joi.string().required(),
            confirmPassword: Joi.string().required()
        })
        try {
            const result = await Joi.validate(req.body, schema)
            if (result) return next()
            console.log('joi passed')
        } catch (error) {
            __.errorMsg(req, res, 400, error.details[0].message, error)
        }
    }

    async userLogin(req, res, next) {
        const schema = Joi.object().keys({
            email: Joi.string().required(),
            password: Joi.string().min(4).max(20).required(),
            // confirmPassword: Joi.string().required()
        })
        try {
            const result = await Joi.validate(req.body, schema)
            if (result) return next()
        } catch (error) {
            // console.log(error)
            __.errorMsg(req, res, 400, error.details[0].message, error)
        }
    }

}

module.exports = new UserValidator();