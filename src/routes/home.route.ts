import { Router } from "express";

// const middleware = require('../middleware');

const HomeRouter: Router = Router();
const middleware = require('../middleware');

// const { HomeUser } = require('../controller/HomeController');
// const middleware = require('../middleware');

HomeRouter.get('/user', middleware ,(req,res) => {
    res.send({
        message: "Hello World"
    })
});

export default HomeRouter;