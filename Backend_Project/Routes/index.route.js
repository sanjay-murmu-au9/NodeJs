const express = require('express');
const app = express();

app.use('/api/v1', require('./user.route'))

module.exports = app;