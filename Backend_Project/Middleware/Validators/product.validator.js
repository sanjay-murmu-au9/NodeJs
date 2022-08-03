const __ = require('../../utilities/util/response.utils')
const Joi = require('joi')

class ProductValidator {
    async create_Product(req, res, next) {
        const schema = ({
            productName: Joi.string().required(),
            price: Joi.number().required(),
            discription: Joi.string().optional(),
            rating: Joi.number().required(),
            images: Joi.optional(),
            category: Joi.string().optional(),
            stock: Joi.number().optional(),
            reviews: Joi.optional()
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

    async list_product(req, res, next) {
        const schema = ({

        })
        const listProduct = {

        }

        try {
            const result = await Joi.validate(listProduct, schema)
            if (result) {
                return next()
            }

        } catch (error) {
            __.errorMsg(req, res, 400, error.details[0].message, error)

        }
    }

}

module.exports = new ProductValidator()