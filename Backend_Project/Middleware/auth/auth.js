const jwt = require('jsonwebtoken');
const __ = require("../../utilities/util/response.utils");
const mongoose = require('mongoose');
const userModelAccess = require('../../Queries/userQuery')
// const AdminUserModelAccess = require('../../Queries/adminUser.query')
const { encryptorToken } = require('./encryptor')
const { decryptorToken } = require('./decryptor')

class Jwt {
    async createToken(userId) {
        userId = userId.toString()
        console.log('hiiiiiiiiiiiiiiiii', userId)
        return jwt.sign({ userId: encryptorToken(userId) }, process.env.SECRET_KEY, { expiresIn: '7d' })
    };

    async authentication(req, res, next) {
        try {
            const decoded = jwt.verify(req.headers.authorization, process.env.SECRET_KEY)
            console.log(decoded, "<<<<<<<<<decoded")
            if (decoded) {
                let verifyUser = await userModelAccess.__getUserById(mongoose.Types.ObjectId(decryptorToken(decoded.userId)))

                if (!verifyUser) return res.status(401).json({ message: 'Illegal access' })

                req.userId = verifyUser.userId
                next()
            }
        } catch (error) {
            console.log(error)
            return __.errorMsg(req, res, 401, error.message, error, 'authentication')

        }
    }
}
module.exports = new Jwt();