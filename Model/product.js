const getDb = require('../util/database').getDb;
const mongoDb = require('mongodb');
// const Cart = require('../Model/cart');

class Product {
    constructor(title, price, description, imageUrl, id) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this._id = id;
    }

    save() {
        const db = getDb();
        let dbOp;
        if (this._id) {
            //update the product
            return dbOp = db.collection('products')
                .updateOne({ _id: new mongoDb.ObjectId(this._id) }, { $set: this })
        } else {
            return dbOp = db.collection('products')
                .insertOne(this).then(result => {
                    // console.log(result)
                }).catch(err => {
                    console.log(err)
                })
        }
    }

    static fetchAll() {
        const db = getDb();
        return db.collection('products')
            .find()
            .toArray()
            .then(products => {
                // console.log(products)
                return products;
            })
            .catch(err => {
                console.log(err)
            })
    }

    static findById(prodId) {
        const db = getDb();
        return db.collection('products')
            .find({ _id: new mongoDb.ObjectId(prodId) })
            .next() // last document
            .then(product => {
                // console.log(product)
                return product;
            }).catch(err => {
                console.log(err)
            })
    }

    static deleteById(id) {
        console.log(id, "req.body")
        const db = getDb();
        return db.collection('products').deleteOne({ _id: new mongoDb.ObjectId(id) }).then(result => { console.log(result) }).catch(err => { console.log(err) })
    }

};

module.exports = Product;
// getProductFromFile = () => {

// }

// module.exports = class Product {
//     constructor(id, title, imageUrl, price, description) {
//         this.id = id;
//         this.title = title;
//         this.imageUrl = imageUrl;
//         this.price = price;
//         this.description = description;

//     }
//     save() {
//         return db.execute(
//             'INSERT INTO products (title,price,imageUrl,description) VALUES (?,?,?,?)',
//             [this.title, this.price, this.imageUrl, this.description]
//         )
//     }

//     static fetchAll() {
//         return db.execute('SELECT * FROM products')
//     }

//     static deleteById(id) {

//     }

//     static findById(id) {
//         return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
//     }

// }