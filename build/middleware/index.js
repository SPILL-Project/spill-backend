"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const jsonwebtoken = require('jsonwebtoken');
module.exports = (req, res, next) => {
    try {
        if (req.headers && req.headers.authorization) {
            console.log(req);
            const token = req.headers.authorization.split(" ")[1];
            console.log(token);
            const decoded = jsonwebtoken.verify(token, process.env.JWT_KEY);
            req.userData = decoded;
            next();
        }
        else {
            return res.status(401).json({
                message: 'Auth failed'
            });
        }
    }
    catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};
//# sourceMappingURL=index.js.map