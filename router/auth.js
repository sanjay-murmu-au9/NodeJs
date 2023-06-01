const express = require('express')

const router = express.Router()
const authController = require('../controller/auth')

router.get('/login', authController.login)



module.exports = router;