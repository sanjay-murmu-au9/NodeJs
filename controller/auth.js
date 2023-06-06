exports.login = (req, res, next) => {
    // console.log(req.get('Cookie') == 'true', "CCCCCCCCCCCCCOOO")
    // console.log(req.get('Cookie').trim().split('=')[1] == 'true', "CCCCCCCCCCCCCOOO")
    console.log(req.session.isLoggedIn, "true/false")
    res.render('auth/login', {
        pageTitle: 'login',
        path: '/login',
        isAuthenticated: req.session.isLoggedIn
    });
}

exports.postLogin = (req, res, next) => {
    // req.isLoggedIn = true
    // req.setHeader('Set-Cookie', 'isLoggedIn = true; max-Age=10')
    req.session.isLoggedIn = true
    // res.setHeader('Set-Cookie', 'loggedIn=true');
    res.redirect('/')
}


exports.logout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err);
        res.redirect('/')
    })
}