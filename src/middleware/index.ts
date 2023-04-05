require('dotenv').config();
const jsonwebtoken = require('jsonwebtoken');
import { Request, Response, NextFunction } from "express";

import UserRequestData from "../types/user.type";
import { log } from "console";

module.exports = (req: UserRequestData,res: Response,next: NextFunction) => {
    try{
        if (req.headers && (req.headers as any).authorization) {
            console.log(req)
            const token = (req.headers as any).authorization.split(" ")[1];
            console.log(token);
            
            const decoded = jsonwebtoken.verify(token, process.env.JWT_KEY);
            req.userData = decoded;
            next();
        } else {
            return res.status(401).json({
                message: 'Auth failed'
            });
        }
    } catch (error){
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
}