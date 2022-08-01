const __ = require('../../utilities/Response');
const Query = require('../../Queries/productQuery');
const jwt = require('../../Middleware/auth/auth');
const md5 = require('md5');

class Product {

    async createProduct(req, res) {
        try {
            // let productName = req.body.Product;
            // let productDescription = req.body.productDescription;
            // let price = req.body.price;

            // let result = [];
            // result.push({
            //     productName: productName,
            //     discription: productDescription,
            //     price: price
            // })
            const createProduct = await Query.addProduct(req.body)
            if (!createProduct || addProduct == null || undefined) return __.customMsg(req, res, 404, 'Product could not created successfully!')

            if (createProduct && createProduct.length > 0) {
                return __.successMsg(req, res, 201, createUser, "Product created successfully")
            }



        } catch (error) {
            __.errorMsg(req, res, 503, "service unavailable", error)
        }
    }


}

module.exports = new Product();