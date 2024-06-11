const express = require('express')
const morgan = require('morgan')
const helmet= require('helmet')
const compression= require('compression')
const path = require('path')
const bodyParser = require('body-parser');
const cors = require('cors');
// -------------------------------


const app = express()

// init middleware
const corsOptions = {
    origin: 'http://localhost:3000', // Cho phép origin từ frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Cho phép các phương thức HTTP cần thiết
    allowedHeaders: ['Content-Type', 'Authorization'], // Cho phép các header cần thiết
  };
  
app.use(cors(corsOptions));
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())
app.use(bodyParser.json());


// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../frontend/build')));

// handle errors 


// init routers
// app.use('/', routes); 

// // init routers
// app.use('/', pluginRoutes);

// Load plugins and initialize routes


module.exports = app


