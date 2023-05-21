const path = require('path')
const express = require('express')
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views')


const adminRoute = require('./router/admin')
const shopRoute = require('./router/shop')
const errorController = require('./controller/error')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/admin', adminRoute)
// app.use(shopRoute)


app.use(errorController.get404)

app.listen(4040, () => {
    console.log('App listening on port 4040!');
});