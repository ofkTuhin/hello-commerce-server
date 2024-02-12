import { Schema, model } from "mongoose";
import { productSize } from "./product.constant";
import { IProduct, IProductModel } from "./product.interface";

export const ProductSchema = new Schema<IProduct, IProductModel>(
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
    image: {
      type: String,
    },
    price: {
      type: Number,
    },
    size: {
      type: String,
      enum: productSize,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Product = model<IProduct, IProductModel>("Product", ProductSchema);
