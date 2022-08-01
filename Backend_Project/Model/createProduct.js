const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductModel = new Schema({
    productName: {
        type: String,
        required: true
    },
    Price: {
        type: Number,
        required: true
    },
    discription: {
        type: String
    },


})

module.exports = mongoose.model('Product', ProductModel)