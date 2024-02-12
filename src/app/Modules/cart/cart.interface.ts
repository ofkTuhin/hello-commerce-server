import mongoose, { Model } from "mongoose";

export type ICart = {
  user_id: string;
  product: mongoose.ObjectId;
  quantity: number;
};

export type ICartModel = Model<ICart>;
