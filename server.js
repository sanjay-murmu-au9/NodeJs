const path = require('path')
const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views')

const User = require('./Model/user');
const adminRoute = require('./router/admin')
const shopRoute = require('./router/shop')
const errorController = require('./controller/error')
const authlogin = require('./router/auth')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('6474e30f48013ab5adc32035')
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

mongoose.connect('mongodb+srv://Sanjaymurmu40:bW9nGBnl3eGH4UkO@shopdatabaseusingmongoo.q18dd.mongodb.net/test?retryWrites=true&w=majority')
    .then(result => {
        User.findOne().then(user => {
            // console.log(user, "KKKKKKKKKKKKKKKKKK")
            if (!User) {
                const user = new User({
                    name: "Sanjay Murmu",
                    email: "Sanjaymurmu40work@gmail.com",
                    cart: {
                        items: []
                    }
                });
                user.save();
            }
        })
        console.log('mongoose connected!!')
        app.listen(4040)
    }).catch(err => {
        console.log(err)
    })