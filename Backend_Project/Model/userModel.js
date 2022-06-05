const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        default: "mysecretpassword"
    },
    isPasswordChanged: {
        type: Boolean,
        default: false
    },
    profilePhoto: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', UserSchema);