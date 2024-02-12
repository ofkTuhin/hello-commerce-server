import mongoose, { Schema, model } from "mongoose";
import { ICart, ICartModel } from "./cart.interface";

export const CartSchema = new Schema<ICart, ICartModel>(
  {
    user_id: {
      type: String,
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Cart = model<ICart, ICartModel>("Cart", CartSchema);
