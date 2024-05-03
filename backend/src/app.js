const express = require('express')
const morgan = require('morgan')
const helmet= require('helmet')
const compression= require('compression')
const path = require('path')
const bodyParser = require('body-parser');


// -------------------------------
const routes = require('./routes/test.route');


const app = express()



// init middleware
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())
app.use(bodyParser.json());


// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../frontend/build')));


// init db


// handle errors 


// init routers
app.use('/', routes); 


module.exports = app


