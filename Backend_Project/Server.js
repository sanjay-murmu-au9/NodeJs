require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const morgoSanitizer = require('express-mongo-sanitize');
const cors = require('cors');
const chalk = require('chalk'); // install only @3.0.0
const helmet = require('helmet');
const cluster = require('cluster');
const environment = process.env.NODE_ENV || 'development';

let envConfig;

switch (environment) {
    case 'development':
        envConfig = require('./config/dev.config.json');
        break;
    case 'production':
        envConfig = require('./config/prod.config.json');
        break;
    default:
        envConfig = require('./config/local.config.json');
        break;
}

module.exports = envConfig;

let debugMode = process.env.DEBUG_MODE || true;

if (debugMode) {
    app.listen(envConfig._LOCAL_PORT_, () => {
        console.log(chalk.yellow(`[ ✓ ] app running ${envConfig.ServerName} on port : ${envConfig._LOCAL_PORT_}`))
    });
} else {
    if (!cluster.isMastry) {
        app.listen(envConfig._LOCAL_PORT_, () => {
            console.log(chalk.blue(`[ ✓ ] app running ${process.env.ServerName} on port : ${envConfig._LOCAL_PORT_}`))
        })
    }
}


// middleware
app.use(bodyParser.urlencoded({ extended: true, limit: '25mb' }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(morgoSanitizer());

require('./DataAdoptor/connection')

app.use(require('./Routes/index.route'))

