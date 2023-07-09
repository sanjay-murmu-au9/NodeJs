const express = require('express')
const adminController = require('../controller/admin')
const isAuth = require('../middleware/is-auth');
const { check, body } = require('express-validator/check')

const router = express.Router()

router.get('/add-product', isAuth, adminController.getAddProduct);

router.get('/products', adminController.getProducts)

router.post('/add-product', isAuth, [
    body('title')
        .isString()
        .isLength({ min: 5 })
        .trim(),
    body('imageUrl')
        .isURL()
    ,
    body('description')
        .isString()
        .isLength({ min: 5, max: 400 })
        .trim(),
    body('price')
        .isFloat(),

], adminController.postAddProduct)

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct)

router.post('/edit-product', isAuth, [
    body('title')
        .isString()
        .isLength({ min: 5 })
        .trim(),
    body('imageUrl')
        .isURL(),
    body('description')
        .isString()
        .isLength({ min: 5, max: 400 })
        .trim(),
    body('price')
        .isFloat()
], adminController.postEditProduct)

router.post('/delete-product', isAuth, adminController.postDeleteProduct)


module.exports = router;
