import { Request, Response } from "express";

exports.Welcome = async (req: Request, res: Response) => {

    res.send('Welcome To Api Spill');

}