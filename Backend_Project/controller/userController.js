const Query = require('../Queries/userQuery');
const __ = require('../utilities/Response');
const jwt = require('../Middleware/auth/auth');
const md5 = require('md5');

class UserCtrl {
    async User(req, res) {
        try {
            const userCount = await Query.getUserCount(req.body);
            if (userCount.length) return __.customMsg(req, res, 404, 'User with given credentials allready exist')

            if (req.body.password !== req.body.confirmPassword) {
                return__.customMsg(req, res, 404, 'User password does not matched with confirm password')
            }

            const createUser = await Query.insertUserDetails(req.body);
            if (createUser) {
                // createUser.password = undefined
                // createUser.__v = undefined
                return __.successMsg(req, res, 201, createUser, "user created successfully")
            }

        } catch (error) {
            console.log(error)
            __.errorMsg(req, res, 503, "service unavailable", error)
        }
    }

    async userLogin(req, res) {
        try {
            // const { email, password } = req.body;
            const userLogin = await Query.userLogin(req.body.email);

            if (!userLogin) return __.customMsg(req, res, 404, "User does not exist with this email")
            // if (!userLogin.password || userLogin.password !== md5(req.body.password)) return __.customMsg(req, res, 404, "Incorrect password")


            if (userLogin) {
                let token = jwt.createToken(userLogin._id);
                console.log(token, '<<<<<<<<<<<<<<<<<userlogin')


                return __.successMsg(req, res, 200, { userLogin, token }, "User logged in successfully")
            }

        } catch (error) {
            console.log(error)
            __.errorMsg(req, res, 404, "service unavailable", error)

        }
    }

}

module.exports = new UserCtrl();