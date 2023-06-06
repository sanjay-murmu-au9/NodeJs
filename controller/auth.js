const User = require('../Model/user')
exports.login = (req, res, next) => {
    res.render('auth/login', {
        pageTitle: 'login',
        path: '/login',
        isAuthenticated: false
    });
}

exports.postLogin = (req, res, next) => {
    User.findById('6474e30f48013ab5adc32035').then(user => {
        req.session.isLoggedIn = true;
        req.session.user = user;
        req.session.save(err => {
            console.log(err);
            res.redirect('/')
        });
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