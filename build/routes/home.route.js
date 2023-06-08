"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// const middleware = require('../middleware');
const HomeRouter = (0, express_1.Router)();
const middleware = require('../middleware');
const { HomeUser, HomeSearch } = require('../controllers/home.controller');
// const middleware = require('../middleware');
HomeRouter.get('/user', HomeUser);
HomeRouter.get('/user/:product', HomeSearch);
exports.default = HomeRouter;
//# sourceMappingURL=home.route.js.map