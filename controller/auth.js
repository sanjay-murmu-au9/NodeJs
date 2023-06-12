const User = require('../Model/user')
const bcrypt = require('bcryptjs')


exports.login = (req, res, next) => {
    res.render('auth/login', {
        pageTitle: 'login',
        path: '/login',
        isAuthenticated: false
    });
}

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.redirect('/login')
            }
            bcrypt.compare(password, user.password)
                .then((doMatch) => {
                    // console.log(doMatch, "true/false")
                    req.session.isLoggedIn = true;
                    req.session.user = user;
                    return req.session.save(err => {
                        console.log(err);
                        res.redirect('/')
                    });
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
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'sign up',
        isAuthenticated: false
    });
};

exports.postSignup = (req, res, next) => {
    // const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    User.findOne({ email: email })
        .then(userDoc => {
            if (userDoc) {
                return res.redirect('/login')
            }
            return bcrypt.hash(password, 12)
                .then(hashedPassword => {
                    const user = new User({
                        email: email,
                        password: hashedPassword,
                        confirmPassword: confirmPassword,
                        cart: { items: [] }
                    });
                    return user.save()
                }).then(result => {
                    res.redirect('/login')
                })

        })
        .catch(err => {
            console.log(err)
        })
}