"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware = require('../middleware');
const { registerUser, verifyUser, loginUser, sendTokenChangePassword, validateTokenChangePassword, changePassword, } = require('../controllers/auth.controller');
const AuthRouter = (0, express_1.Router)();
AuthRouter.post('/register', registerUser);
AuthRouter.post('/verify', verifyUser);
AuthRouter.post("/login", loginUser);
// harus login
AuthRouter.get("/send-token", middleware, sendTokenChangePassword);
AuthRouter.get("/change-password", middleware, validateTokenChangePassword);
AuthRouter.post("/change-password", middleware, changePassword);
// router.get('/send-token', middleware, sendTokenChangePassword)
exports.default = AuthRouter;
//# sourceMappingURL=auth.route.js.map