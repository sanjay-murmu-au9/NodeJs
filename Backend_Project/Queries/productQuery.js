const { default: mongoose } = require('mongoose')
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

    async ProductDetail(prodId) {
        return await ProductModel.find({ _id: mongoose.Types.ObjectId(prodId) })
    }
}

module.exports = new ProductQuery()