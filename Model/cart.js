const fs = require('fs');
const path = require('path')

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
)

module.exports = class Cart {
    static addProduct(id, productPrice) {
        //fetching the prev cart
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };
            if (!err) {
                cart = JSON.parse(fileContent)
            }
            //analyze the cart => find existing product
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id)
            // console.log(existingProductIndex, "<<<<<<<existingProductIndex")
            const existingProduct = cart.products[existingProductIndex] // location at which point i found!
            let updatedProduct;
            // add new product/ increase quantity;
            if (existingProduct) {
                updatedProduct = { ...existingProduct } // destructuring
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products]; // co
                cart.products[existingProductIndex] = updatedProduct;// cart product overwrite

            } else {
                updatedProduct = { id: id, qty: 1 }
                cart.products = [...cart.products, updatedProduct]; // old cart product, new additionalProduct
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err)
            })
        })
    }

    static deleteProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                return;
            }
            const updatedCart = { ...JSON.parse(fileContent) };
            const product = updatedCart.products.find(prod => prod.id == id);
            if (!product) {
                return;
            }
            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter(
                prod => prod.id !== id
            );
            updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;

            fs.writeFile(p, JSON.stringify(updatedCart), err => {
                console.log(err)
            });
        });
    }

    static getCart(cb) {
        fs.readFile(p, (err, fileContent) => {
            const cart = JSON.parse(fileContent)
            if (err) {
                cb(null);
            } else {
                cb(cart);
            }
        })
    }

}
