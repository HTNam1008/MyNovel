'use strict'


const express = require('express');
const router  = express.Router();


const testController=require('../controllers/test.controller')
const searchController=require('../controllers/search.controller')

router.get('/api',testController.test)

router.get('/search',searchController.search)

module.exports = router;