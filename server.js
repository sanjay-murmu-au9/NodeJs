const path = require('path')
const express = require('express')
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views')

const User = require('./Model/user');
const adminRoute = require('./router/admin')
const shopRoute = require('./router/shop')
const errorController = require('./controller/error')
const mongoConnect = require('./util/database').mongoConnect;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('647181f40c6b27b68fe81d9a')
        .then(user => {
            // req.user = user;
            req.user = new User(user.name, user.email, user.cart, user._id); // store it in req uest;
            next();
        })
        .catch(err => {
            console.log(err)
        })
})

app.use('/admin', adminRoute)
app.use(shopRoute)


app.use(errorController.get404)

mongoConnect(() => {
    app.listen(4040);
})
