const getDb = require('../util/database').getDb;
const mongoDb = require('mongodb')

class User {
    constructor(username, email, cart, id) {
        this.name = username;
        this.email = email;
        this.cart = cart; //{ items=[]}
        this._id = id
    }

    save() {
        const db = getDb();
        return db.collection('users').insertOne(this).then(res => { console.log(res) }).catch(err => { console.log(err) })
    }

    static findById(userId) {
        const db = getDb()
        return db.collection('users')
            .findOne({ _id: new mongoDb.ObjectId(userId) })
            .then(result => {
                return result;
            })
            .catch(err => { console.log(err) })

    }

    addToCart(product) {
        // const cartProduct = this.cart.items.findIndex(cp => {
        //     return cp._id === product._id;
        // });
        const updatedCart = { items: [{ ...product, quantity: 1 }] }
        const db = getDb();
        return db.collection('users').updateOne(
            { _id: new mongoDb.ObjectId(this._id) },
            { $set: { cart: updatedCart } }
        )
    }
}

module.exports = User;