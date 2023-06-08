"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const index_route_1 = require("./routes/index.route");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3000;
// parse body request
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
// cors access handler
app.use((0, cors_1.default)());
app.use((_req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});
(0, index_route_1.routes)(app);
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
var options = {
    explorer: true
};
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
const wa_1 = require("./wa");
(0, wa_1.main)();
//# sourceMappingURL=App.js.map