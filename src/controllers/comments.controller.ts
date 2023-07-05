import { Request, Response } from 'express';
const { Sequelize, Op } = require('sequelize');

const { Discussions } = require('../db/models');

export const getAllComments = async (req: Request, res: Response) => {
  try {
    const getComment = await Discussions.findAll();
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
    const { userId, username, productId, body, parentId } = req.body;
    const comment = await Discussions.create({
      userId,
      username,
      productId,
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
export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    await Discussions.destroy({
      where: {
        id: id,
      },
    });

    return res.status(201).json({
      message: 'Comment Sukses Terhapus',
    });
  } catch (error) {
    return res.status(404).json({
      message: 'Comment Gagal Terhapus',
    });
  }
};

export const updateComment = async (req: Request, res: Response) => {
  try {
    const { id, body } = req.body;

    await Discussions.update(
      {
        body: body,
      },
      {
        where: {
          id: id,
        },
      }
    );

    return res.status(201).json({
      message: 'Comment Sukses Terupdate',
    });
  } catch (error) {
    return res.status(404).json({
      message: 'Comment Gagal Terupdate',
    });
  }
};
