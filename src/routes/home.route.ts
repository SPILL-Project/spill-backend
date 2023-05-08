import { Router } from "express";

// const middleware = require('../middleware');

const HomeRouter: Router = Router();
const middleware = require('../middleware');

const { HomeUser, HomeSearch } = require('../controllers/home.controller');
// const middleware = require('../middleware');

HomeRouter.get('/user' ,HomeUser);
HomeRouter.get('/user/:product', HomeSearch)

export default HomeRouter;