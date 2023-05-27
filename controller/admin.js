const Product = require('../Model/product')
const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    });
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(product => {
            if (!product) {
                return res.redirect('/')
            }
            res.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                editing: editMode,
                product: product
            });
        });
}


exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const descrition = req.body.description;

    const product = new Product(title, imageUrl, price, descrition, null, req.user._id)

    product.save()
        .then(result => {
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err)
        });

}

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then(products => {
            // console.log(products, "<<<<<<<products")
            res.render('admin/products', {
                prods: products,
                pageTitle: 'Admin Products',
                path: '/admin/products'
            })
        }).catch((err) => {
            console.log(err)
        })
}


exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDesc = req.body.description;


    const updatedProduct = new Product(
        updatedTitle,
        updatedImageUrl,
        updatedPrice,
        updatedDesc,
        new ObjectId(prodId)
    )
    updatedProduct
        .save()
        .then(result => {
            // console.log(res, "res>>>>>>")
            res.redirect('/admin/products')
        })
        .catch(err => {
            console.log(err)
        })
}

exports.postDeleteProduct = (req, res, next) => {
    const productId = req.body.productId;
    Product.deleteById(productId)
        .then(() => {
            console.log('Product deleted!!')
            res.redirect('/admin/products')
        }).catch(err => {
            console.log(err)
        })
}
