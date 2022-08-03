const Query = require('../../Queries/productQuery');
const __ = require('../../utilities/Response');
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
            console.log(req.body, "<<<<req.body")
            const createProduct = await Query.addProduct(req.body)
            if (!createProduct || createProduct == null || createProduct == undefined) { return __.customMsg(req, res, 404, 'Product could not created successfully!') }

            if (createProduct) {
                return __.successMsg(req, res, 201, createProduct, "Product created successfully")
            }



        } catch (error) {
            console.log(error, "error")
            __.errorMsg(req, res, 503, "service unavailable", error)
        }
    }

    async listingProduct(req, res) {
        try {
            const listingProduct = await Query.listProduct();
            if (listingProduct == undefined || listingProduct == null) {
                return __.customMsg(req, res, 404, 'No product found!')
            }

            if (listingProduct) {
                return __.successMsg(req, res, 201, listingProduct, "Product fetch successfully")
            }

        } catch (error) {
            console.log(error)
            __.errorMsg(req, res, 503, "service unavailable", error)

        }
    }


}

module.exports = new Product();