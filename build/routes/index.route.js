"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const auth_route_1 = __importDefault(require("./auth.route"));
const home_route_1 = __importDefault(require("./home.route"));
const _routes = [
    ["/auth", auth_route_1.default],
    ["/home", home_route_1.default]
];
const routes = (app) => {
    _routes.forEach((route) => {
        const [path, router] = route;
        app.use(path, router);
    });
};
exports.routes = routes;
//# sourceMappingURL=index.route.js.map