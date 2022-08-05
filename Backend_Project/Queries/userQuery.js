const userModel = require('../Model/userModel');
const argon2 = require('argon2');

class userQuery {
    async getUserCount(body) {
        return await userModel.find({
            email: body.email
        })
    }

    async insertUserDetails(body) {
        const hashPassword = await argon2.hash(body.password)
        body.password = hashPassword;
        return await userModel.create(body)
    }

    async userLogin(email) {
        console.log(email, '<<<<<<<<<email')
        return await userModel.findOne({ email }) // if key value are same then key value can be avoid;
    }

    async __getUserById(id) {
        return userModel.find({
            _id: id,
            deleteStatus: false
        })
    }

}

module.exports = new userQuery();