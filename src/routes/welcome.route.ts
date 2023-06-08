import { Router } from "express";

const {Welcome} = require('../controllers/welcome.controller')

const WelcomeRouter: Router = Router();

WelcomeRouter.get("/", Welcome)

export default WelcomeRouter;