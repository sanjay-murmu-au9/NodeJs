const mongoose = require('mongoose');
const envConfig = require('../Server');
mongoose.Promise = global.Promise
const chalk = require('chalk');

try {
    let Conn = '';
    if (process.env.NODE_ENV === 'development') {
        Conn = `${envConfig.Database.Protocol}${envConfig.Database.DatabaseUsername}:${envConfig.Database.DatabasePass}@${envConfig.Database.Host}/${envConfig.Database.DatabaseName}`
    };

    if (process.env.NODE_ENV === 'production') {
        Conn = `${envConfig.Database.Protocol}${envConfig.Database.DatabaseUsername}:${envConfig.Database.DatabasePass}@${envConfig.Database.Host}/${envConfig.Database.DatabaseName}`
    }

    mongoose.connect(Conn, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }, (err, Conn) => {
        if (err) return console.error(chalk.red(' [ ✗ ] '), err);

        console.log(chalk.green(' [ ✓ ]'), `Connected to Database : ${envConfig.Database.DatabaseName}`);
        mongoose.set('debug', true);
    });

} catch (error) {
    console.error(chalk.red(' [ ✗ ] '), error);
}

module.exports = mongoose;