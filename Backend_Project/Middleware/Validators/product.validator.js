const __ = require('../../utilities/util/response.utils')
const Joi = require('joi')

class ProductValidator {
    async createProduct(req, res, next) {
        const schema = ({
            productName: Joi.string().required(),

        })

        try {
            const result = await Joi.validate(req.body, schema)
            if (result) {
                return next()
            }
        } catch (error) {
            __.errorMsg(req, res, 400, error.details[0].message, error)
        }

    }

}

module.exports = new ProductValidator()