import mongoose, { Schema, model } from "mongoose";
import { ICheckout, ICheckoutModel } from "./checkout.interface";

export const CheckoutSchema = new Schema<ICheckout, ICheckoutModel>(
  {
    user_id: {
      type: String,
      required: true,
      unique: true,
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
    },
    total_price: {
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

export const Checkout = model<ICheckout, ICheckoutModel>(
  "Checkout",
  CheckoutSchema
);
