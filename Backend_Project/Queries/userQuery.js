const userModel = require('../Model/userModel');

class userQuery {
    async getUserCount(body) {
        return await userModel.find({
            email: body.email
        })
    }

    async insertUserDetails(body) {
        return await userModel.create(body)
    }

    async userLogin(email) {
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