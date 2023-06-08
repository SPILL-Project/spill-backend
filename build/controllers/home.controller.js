"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// Library Zone
require('dotenv').config();
const { Sequelize, Op } = require('sequelize');
const moment = require('moment');
// Database Zone
const { Product, Review } = require("../db/models");
exports.HomeUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // find review with belongsTo product
    const hot_review = yield Review.findAll({
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
    });
    // buatkan variabel selection_product dimana akan mengget tabel Product dengan relasi review tapi review dengan urutan createdAt sebulan terakhir
    const selection_product = yield Product.findAll({
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
    });
    // urut berdasarkan jumlah reviews terbanyak
    selection_product.sort((a, b) => {
        return b.reviews.length - a.reviews.length;
    });
    // hilangkan semua object review pada selection_product
    selection_product.forEach((product) => {
        delete product.dataValues.reviews;
    });
    // ambil 3 data pertama dari selection_product
    selection_product.splice(3);
    // send response
    res.status(200).json({
        message: "Success",
        data: {
            hot_review,
            selection_product
        }
    });
});
exports.HomeSearch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // cari produk yang mengandung kata di params
    const products = yield Product.findAll({
        where: {
            judul: {
                [Op.like]: `%${req.params.product}%`
            }
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
    });
    // send response
    res.status(200).json({
        message: "Success",
        data: products
    });
});
//# sourceMappingURL=home.controller.js.map