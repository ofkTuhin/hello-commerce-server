"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = exports.ProductSchema = void 0;
const mongoose_1 = require("mongoose");
const product_constant_1 = require("./product.constant");
exports.ProductSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
    },
    size: {
        type: String,
        enum: product_constant_1.productSize,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Product = (0, mongoose_1.model)("Product", exports.ProductSchema);
