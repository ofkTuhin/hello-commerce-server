"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = exports.ProductSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ProductSchema = new mongoose_1.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    publication_date: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    reviews: {
      type: [String],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
exports.Product = (0, mongoose_1.model)("Product", exports.ProductSchema);
