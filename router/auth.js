const express = require('express')

const router = express.Router()
const authController = require('../controller/auth')

router.get('/login', authController.login)

router.post('/login', authController.postLogin)

router.post('/logout', authController.logout)



module.exports = router;