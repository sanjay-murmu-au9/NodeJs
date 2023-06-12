const path = require('path')
const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const session = require('express-session')
const MONGODB_URI = 'mongodb+srv://Sanjaymurmu40:bW9nGBnl3eGH4UkO@shopdatabaseusingmongoo.q18dd.mongodb.net/shop?retryWrites=true&w=majority'
const MongoDBStore = require('connect-mongodb-session')(session);


const app = express();
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'session',
    // expire:
});

// Catch errors
store.on('error', function (error) {
    console.log(error, "session error");
});


app.set('view engine', 'ejs');
app.set('views', 'views')

const User = require('./Model/user');
const adminRoute = require('./router/admin')
const shopRoute = require('./router/shop')
const errorController = require('./controller/error')
const authlogin = require('./router/auth');

app.use(session({ secret: 'my secret', resave: false, saveUninitialized: false, store: store/*cookie:{maxAge:}*/ }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    if (!req.session.user) {
        return next()
    }
    User.findById(req.session.user._id)
        .then(user => {
            req.user = user
            next();
        })
        .catch(err => {
            console.log(err)
        })
})

app.use('/admin', adminRoute)
app.use(shopRoute)
app.use(authlogin)


app.use(errorController.get404)

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(result => {
        console.log('mongoose connected!!')
        app.listen(4040)
    }).catch(err => {
        console.log(err)
    })