var express = require('express');
var router = express.Router();
const middleware = require('../middleware');

const {
    registerUser, 
    verifyUser, 
    loginUser, 
    sendTokenChangePassword, 
    validateTokenChangePassword,
    changePassword,
    HomeUser
} = require('../controller/AuthController');
const {  } = require('../controller/HomeController');

router.post('/register', registerUser);
router.post('/verify', verifyUser);
router.post("/login", loginUser);

// harus login
// router.post("/send-token", middleware, sendTokenChangePassword);
router.get("/change-password", middleware, validateTokenChangePassword)
router.post("/change-password", middleware, changePassword)

router.get('/send-token', middleware, sendTokenChangePassword)

module.exports = router;