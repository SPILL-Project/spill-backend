import { Application, Router } from "express";
import AuthRouter from "./auth.route";
import HomeRouter from "./home.route";

const _routes: Array<[string, Router]> = [
    ["/auth", AuthRouter],
    ["/home", HomeRouter]
]

export const routes = (app: Application) => {
    _routes.forEach((route) => {
        const [path, router] = route;
        app.use(path, router);
    })
}