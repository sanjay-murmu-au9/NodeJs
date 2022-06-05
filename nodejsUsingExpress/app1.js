const http = require('http');
const express = require('express');
const app = express();


app.use((req, res, next) => {
    console.log('In the  middleware')
    next() // allow the request to continue to the next middleware in line
})

app.use((req, res, next) => {
    console.log('ANother middleware..!')
    res.send('<h1>Hello there from express!</h1>')
    // res.status(200).json({ key: '<h1>Hello there from express!</h1>' })// key value pair
})

// const server = http.createServer(app);
// server.listen(3000);

// or 
app.listen(3000)  // according to git rep https://github.com/expressjs/express/blob/master/lib/application.js
