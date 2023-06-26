const crypto = require('crypto');
const User = require('../Model/user')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport')

const transporter = nodemailer.createTransport(
    sendgridTransport({
        auth: {
            api_key: ""
        }
    })
)

exports.login = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0]
    } else {
        message = null
    }
    res.render('auth/login', {
        pageTitle: 'login',
        path: '/login',
        isAuthenticated: false,
        errorMessage: message
    });
}

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                req.flash('error', 'Invalid email or password!')
                return res.redirect('/login')
            }
            bcrypt.compare(password, user.password)
                .then((doMatch) => {
                    if (doMatch) {
                        // console.log(doMatch, "true/false")
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        return req.session.save(err => {
                            console.log(err);
                            res.redirect('/')
                        });
                    }
                    req.flash('error', "Invalid email or password!")
                    res.redirect('/login')
                }).catch(err => {
                    console.log(err);
                    res.redirect('/login')
                })
        }).catch(err => {
            console.log(err)
        })

}


exports.logout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err);
        res.redirect('/')
    })
}

exports.getSignup = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0]
    } else {
        message = null
    }
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'sign up',
        isAuthenticated: false,
        errorMessage: message,
    });
};

exports.postSignup = (req, res, next) => {
    // const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    if (password !== confirmPassword) {
        req.flash('error', `Password didn't matched `)
        return res.redirect('/signup')
    }
    User.findOne({ email: email })
        .then(userDoc => {
            if (userDoc) {
                req.flash('error', 'Email allready available Please try with different email')
                return res.redirect('/login')
            }
            return bcrypt.hash(password, 12)
                .then(hashedPassword => {
                    const user = new User({
                        email: email,
                        password: hashedPassword,
                        confirmPassword: hashedPassword/*bcrypt.hash(confirmPassword, 12)*/,
                        cart: { items: [] }
                    });
                    return user.save()
                }).then(result => {
                    res.redirect('/login')
                    return transporter.sendMail({
                        to: email,
                        from: 'sanjaymurmu40work@gmail.com',
                        subject: 'Signup successed!',
                        html: `<h1>You successfully signed up!</h1>`
                    })
                })

        })
        .catch(err => {
            console.log(err)
        })
}

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/')
    })
}

exports.getReset = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0]
    } else {
        message = null
    }
    res.render('auth/reset', {
        path: '/reset',
        pageTitle: 'Reset Password',
        errorMessage: message
    })
}

exports.postReset = (req, res, next) => {
    const email = req.body.email;
    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log(err)
            return res.redirect('/reset');
        }
        const token = buffer.toString('hex');
        User.findOne({ email: email })
            .then(user => {
                console.log(user, "<<<<<<<user")
                if (!user) {
                    req.flash('error', `No Matched account found with this ${email}`)
                    return res.redirect('/reset');
                }
                user.resetToken = token;
                user.resetTokenExpiration = Date.now() + 3600000;
                return user.save();

            })
            .then((result) => {
                res.redirect('/');
                transporter.sendMail({
                    to: email,
                    from: 'sanjaymurmu40work@gmail.com',
                    subject: 'Password reset',
                    html: `
                    <p>You requested a password reset</p>
                    <p>Click this <a href="http://localhost:4040/reset/${token}"></a>to set a new password.</p>
                    `
                })
            })
            .catch(err => {
                console.log(err)
            })
    })
}

exports.getNewPassword = (req, res, next) => {
    const token = req.params.token;
    User.findOne({ resetToken: token, resetTokenExpiration: { $gte: Date.now() } })
        .then(user => {
            let message = req.flash('error');
            if (message.length > 0) {
                message = message[0]
            } else {
                message = null
            }
            res.render('auth/new-password', {
                path: '/new-password',
                pageTitle: 'New Password',
                errorMessage: message,
                userId: user._id.toString(),
                passwordToken: token
            })
        }).catch(err => {
            console.log(err)
        })
}


exports.postNewPassword = (req, res, next) => {
    const newPassword = req.body.password;
    const userId = req.body.userId;
    const passwordToken = req.body.passwordToken;
    let resetUser;
    User.findOne({
        _id: userId,
        resetToken: passwordToken,
        resetTokenExpiration: { $gt: Date.now() },
    })
        .then((user) => {
            resetUser = user;
            return bcrypt.hash(newPassword, 12);
        })
        .then(hashedPassword => {
            resetUser.password = hashedPassword;
            resetUser.resetToken = undefined;
            resetUser.resetTokenExpiration = undefined;
            return resetUser.save();
        })
        .then((result) => {
            res.redirect('/login')
        }).catch(err => {
            console.log(err)
        })
}