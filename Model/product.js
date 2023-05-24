const getDb = require('../util/database').getDb;
// const Cart = require('../Model/cart');

class Product {
    constructor(title, price, description, imageUrl) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    save() {
        const db = getDb();
        return db.collection('products')
            .insertOne(this).then(result => { console.log(result) }).catch(err => {
                console.log(err)
            })
    }


    static fetchAll() {
        const db = getDb();
        return db.collection('products')
            .find()
            .toArray()
            .then(products => {
                console.log(products)
                return products;
            })
            .catch(err => {
                console.log(err)
            })
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