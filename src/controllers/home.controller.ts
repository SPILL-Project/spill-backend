// Library Zone
require('dotenv').config();
import { Request, Response } from "express";
const { Sequelize, Op } = require('sequelize');
const moment = require('moment');

// Database Zone
const {Product, Review} = require("../db/models")

exports.HomeUser = async (req: Request, res: Response) => {

    // find review with belongsTo product
    const hot_review: Object = await Review.findAll({
        order: [
            ['like', 'DESC']
        ],
        limit: 3,
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        include: {
            model: Product,
            as: "product",
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
        }
    })
    
    // buatkan variabel selection_product dimana akan mengget tabel Product dengan relasi review tapi review dengan urutan createdAt sebulan terakhir
    const selection_product: Array<any> = await Product.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        include: {
            model: Review,
            as: "reviews",
            where: {
                createdAt: {
                    [Op.gte]: moment().subtract(1, 'months').toDate()
                }          
            }
        },
    })

    // urut berdasarkan jumlah reviews terbanyak
    selection_product.sort((a:any, b:any) => {
        return b.reviews.length - a.reviews.length
    })

    // hilangkan semua object review pada selection_product
    selection_product.forEach((product:any) => {
        delete product.dataValues.reviews
    })

    // ambil 3 data pertama dari selection_product
    selection_product.splice(3)

    // send response
    res.status(200).json({
        message: "Success",
        data: {
            hot_review,
            selection_product
        }
    })
}

exports.HomeSearch = async (req: Request, res: Response) => {

    // cari produk yang mengandung kata di params
    const products: Object = await Product.findAll({
            where: {
                judul: {
                    [Op.like]: `%${req.params.product}%`
                }
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
        }
    )

    // send response
    res.status(200).json({
        message: "Success",
        data: products
    })
}