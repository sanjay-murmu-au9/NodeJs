const express = require('express')
const { check, body } = require('express-validator/check');
const router = express.Router()
const authController = require('../controller/auth')
const User = require('../Model/user')

router.get('/login', authController.login)

router.post('/login', [
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please enter a valid email address.'),
    body('password', 'Password has to be valid.')
        .trim()
        .isLength({ min: 5 })
        .isAlphanumeric()
],
    authController.postLogin)

router.post('/logout', authController.logout)

router.get('/signup', authController.getSignup)

router.post('/signup',
    [
        check('email')
            .isEmail()
            .normalizeEmail()
            .withMessage('Please enter a valid email address!')
            .custom((value, { req }) => {
                if (value === 'test@gmail.com') {
                    throw new Error('This email is forbidden.')
                }
                return User.findOne({ email: value }).then(userDoc => {
                    if (userDoc) {
                        return Promise.reject('E-Mail exists already pick a different one.')
                    }
                })
            }),
        body(
            'password',
            'Please enter a password with only numbers and text at least 5 characters.'
        ).trim()
            .isLength({ min: 5 })
            .isAlphanumeric(),
        body('confirmPassword').custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Password have to match')
            }
            return true;
        })
    ],
    authController.postSignup
)

router.post('/logout', authController.postLogout)

router.get('/reset', authController.getReset)

router.post('/reset', authController.postReset)

router.get('/reset/:token', authController.getNewPassword)

router.post('/new-password', authController.postNewPassword);



module.exports = router;