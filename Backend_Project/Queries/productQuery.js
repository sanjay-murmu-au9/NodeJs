const ProductModel = require('../../Model/createProduct')

class ProductQuery {
    async addProduct(body) {
        return await ProductModel.create(body)
    }

}

module.exports = new ProductQuery()