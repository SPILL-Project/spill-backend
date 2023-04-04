// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;


const routes = {
    "/auth": require("./authRoute"),
    "/home": require("./homeRoute")
}

module.exports = routes;