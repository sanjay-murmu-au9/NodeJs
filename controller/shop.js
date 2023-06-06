const Product = require('../Model/product');
const Order = require('../Model/order');

exports.getProducts = (req, res, next) => {
    Product.find()
        .then(products => {
            res.render('shop/product-list', {
                prods: products,
                pageTitle: 'All Product',
                path: '/products',
                isAuthenticated: req.session.isLoggedIn
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
                path: '/products',
                isAuthenticated: req.session.isLoggedIn
            })
        })
        .catch(err => {
            console.log(err)
        })
}

exports.getIndex = (req, res, next) => {
    Product.find()
        .then((products) => {
            res.render('shop/index', {
                prods: products,
                pageTitle: 'Shop',
                path: '/',
                isAuthenticated: req.session.isLoggedIn
            })
        }).catch(err => {
            console.log(err)
        })
}



exports.getCart = (req, res, next) => {
    req.user
        .populate('cart.items.productId') // showing product details too;
        // .execPopulate()
        .then(user => {
            // console.log(user.cart.items, "<<<<user")
            const products = user.cart.items;
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: products,
                isAuthenticated: req.session.isLoggedIn
            });
        })
        .catch(err => console.log(err));
}

exports.getOrders = (req, res, next) => {
    Order.find({ "user.userId": req.user._id }).then(order => {
        res.render('shop/orders', {
            path: '/orders',
            pageTitle: 'Your Orders',
            orders: order,
            isAuthenticated: req.session.isLoggedIn
        })
    })
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout',
        isAuthenticated: req.session.isLoggedIn
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
    req.user.removeFromCart(prodId)
        .then(product => {
            res.redirect('/cart');
        })
}

exports.postOrder = (req, res, next) => {
    req.user.populate('cart.items.productId')
        .then((user) => {
            // console.log(user.cart.items, 'populateItems')
            const products = user.cart.items.map(i => {
                // console.log(1, "<<<map")
                return {
                    quantity: i.quantity,
                    product: { ...i.productId._doc }
                }
            });
            const order = new Order({
                user: {
                    name: req.user.name,
                    userId: req.user // it will fetch userId automatically
                },
                products: products,

            })
            return order.save()
        }).then(result => {
            // console.log(result, ">>>>>>>result")
            return req.user.clearCart()
        }).then((result) => {
            res.redirect('/orders')
        })
        .catch(err => {
            console.log(err)
        })
};