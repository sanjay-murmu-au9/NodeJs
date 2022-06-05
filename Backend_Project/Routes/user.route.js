const express = require('express');
const app = express.Router();
const UserValidator = require('../Middleware/Validators/user.validator')
const auth = require('../Middleware/auth/auth')

const userController = require('../controller/userController')

app.post('/userCreate', UserValidator.createUser, userController.User)

app.post('/userLogin', UserValidator.userLogin, userController.userLogin)


module.exports = app;