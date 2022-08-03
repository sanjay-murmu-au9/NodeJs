const ProductModel = require('../Model/createProduct')

class ProductQuery {
    async addProduct(body) {
        // console.log(body, "<<<<<<<<<body")
        return await ProductModel.create(body)
    }

    async listProduct() {
        // console.log()
        return await ProductModel.find({})
    }
}

module.exports = new ProductQuery()