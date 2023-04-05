import { Router } from "express";

const middleware = require('../middleware');

const {
    registerUser, 
    verifyUser, 
    loginUser, 
    sendTokenChangePassword, 
    validateTokenChangePassword,
    changePassword,
} = require('../controllers/auth.controller');


const AuthRouter: Router = Router();

AuthRouter.post('/register', registerUser);
AuthRouter.post('/verify', verifyUser);
AuthRouter.post("/login", loginUser);

// harus login
AuthRouter.get("/send-token", middleware, sendTokenChangePassword);
AuthRouter.get("/change-password", middleware, validateTokenChangePassword)
AuthRouter.post("/change-password", middleware, changePassword)

// router.get('/send-token', middleware, sendTokenChangePassword)

export default AuthRouter;