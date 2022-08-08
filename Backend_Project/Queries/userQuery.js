const userModel = require('../Model/userModel');
const argon2 = require('argon2');
const jwt = require('../Middleware/auth/auth');
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

    async userLogin(email, password) {
        console.log(email, '<<<<<<<<<email', password)
        const userLogin = await userModel.find({ email }).select('+password') // if key value are same then key value can be avoid;
        // console.log(userLogin, "<<<<<<<<<<<,,userLogin")

        if (userLogin && await argon2.verify(userLogin.password, password)) {
            userLogin.password = undefined
            return userLogin;
        } else {
            return null;
        }
    }

    async __getUserById(id) {
        return userModel.find({
            _id: id,
            deleteStatus: false
        })
    }

}

module.exports = new userQuery();