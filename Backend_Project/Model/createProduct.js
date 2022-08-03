const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductModel = new Schema({
    productName: {
        type: String
    },
    price: {
        type: Number
    },
    discription: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        default: 2,
        enum: [1, 2, 3, 4, 5]
    },
    category: {
        type: String,
        default: "normalGlass",
        enum: ['sunGlass', 'eyeGlasses', 'normalGlass']
    },
    stock: {
        type: Number,
    },
    reviews: [
        {
            type: String
        }
    ],
    images: [{
        public_id: String,
        url: String
    }]

}, {
    timestamps: true
})

module.exports = mongoose.model('Product', ProductModel)