var express = require('express');
var router = express.Router();
const { HomeUser } = require('../controller/HomeController');
const middleware = require('../middleware');

router.get('/user', middleware ,HomeUser);

module.exports = router;