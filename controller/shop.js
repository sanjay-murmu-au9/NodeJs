const Product = require('../Model/product');
const Cart = require('../Model/cart');

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then(products => {
            res.render('shop/product-list', {
                prods: products,
                pageTitle: 'All Product',
                path: '/products'
            })
        })
        .catch(err => console.log(err))
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId || 1235;
    Product.findById(prodId)
        .then(product => {
            res.render('shop/product-detail', {
                product: product,
                pageTitle: product.title,
                path: '/products'
            })
        })
        .catch(err => {
            console.log(err)
        })
}

exports.getIndex = (req, res, next) => {
    Product.fetchAll()
        .then((products) => {
            res.render('shop/index', {
                prods: products,
                pageTitle: 'Shop',
                path: '/'
            })
        }).catch(err => {
            console.log(err)
        })
}



exports.getCart = (req, res, next) => {
    req.user.getCart()
        .then(products => {
            // console.log(products, "<<<<<<<<<<<<products")
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: products
            })
        }).catch(err => {
            console.log(err)
        })
}

exports.getOrders = (req, res, next) => {
    req.user.getOrders().then(order => {
        res.render('shop/orders', {
            path: '/orders',
            pageTitle: 'Your Orders',
            orders: order
        })
    })
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    })
}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
        .then((product) => {
            return req.user.addToCart(product);
        }).then(result => {
            res.redirect('/cart')
            // console.log(result, "postCart")
        })
        .catch(err => {
            console.log(err)
        })
}

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.user.deleteItemFromCart(prodId)
        .then(product => {
            res.redirect('/cart');
        })
}

exports.postOrder = (req, res, next) => {
    req.user.addOrder()
        .then(result => {
            // console.log(result, ">>>>>>>>>>>>>")
            res.redirect('/orders')
        }).catch(err => {
            console.log(err)
        })
};