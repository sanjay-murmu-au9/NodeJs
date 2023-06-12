const express = require('express')

const router = express.Router()
const authController = require('../controller/auth')

router.get('/login', authController.login)

router.post('/login', authController.postLogin)

router.post('/logout', authController.logout)

router.get('/signup', authController.getSignup)

router.post('/signup', authController.postSignup)



module.exports = router;