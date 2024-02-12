import mongoose, { Model } from "mongoose";

export type ICheckout = {
  user_id: string;
  product_id: mongoose.ObjectId;
  quantity: number;

  total_price: number;
  size: "XL" | "L" | "M";
};

export type ICheckoutModel = Model<ICheckout>;
