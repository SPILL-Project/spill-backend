"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const { Welcome } = require('../controllers/welcome.controller');
const WelcomeRouter = (0, express_1.Router)();
WelcomeRouter.get("/", Welcome);
exports.default = WelcomeRouter;
//# sourceMappingURL=welcome.route.js.map