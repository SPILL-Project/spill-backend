import { Request, Response } from 'express';
const { Sequelize, Op } = require('sequelize');

const { Comments } = require('../db/models');

export const getAllComments = async (req: Request, res: Response) => {
  try {
    const getComment = await Comments.findAll();
    return res.status(200).json({
      message: 'Sukses mendapatkan data comment',
      data: getComment,
    });
  } catch (error) {
    console.error(error);
  }
};
export const createNewComment = async (req: Request, res: Response) => {
  try {
    const { userId, username, body, parentId } = req.body;
    const comment = await Comments.create({
      userId,
      username,
      body,
      parentId,
    });

    return res.status(201).json({
      message: 'Comment Sukses Terkirim',
      data: comment,
    });
  } catch (error) {
    console.error(error);
  }
};
