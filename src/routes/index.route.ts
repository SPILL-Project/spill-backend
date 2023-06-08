import { Application, Router } from "express";
import AuthRouter from "./auth.route";
import HomeRouter from "./home.route";
import WelcomeRouter from "./welcome.route";

const _routes: Array<[string, Router]> = [
    ["/", WelcomeRouter],
    ["/auth", AuthRouter],
    ["/home", HomeRouter]
]

export const routes = (app: Application) => {
    _routes.forEach((route) => {
        const [path, router] = route;
        app.use(path, router);
    })
}