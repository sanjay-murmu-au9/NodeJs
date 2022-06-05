const mongoose = require('mongoose');
const Schema = mongoose.Schema

const locationModel = Schema({
    name: {
        type: String,
        required: true
    },
    deleteStatus: {
        type: Boolean,
        default: false
    }
}, {
    timeStamps: true
})

module.exports = mongoose.model('Location', locationModel, 'locations')