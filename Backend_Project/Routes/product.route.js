const express = require('express');
const app = express.Router()
const productValidator = require('../Middleware/Validators/product.validator');
const auth = require('../Middleware/auth/auth')

const ProductController = require('../controller/adminController/Product')

app.post('/createProduct', productValidator.create_Product, ProductController.createProduct);
app.get('/listingProduct', productValidator.list_product, ProductController.listingProduct)

module.exports = app;