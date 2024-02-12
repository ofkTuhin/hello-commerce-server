import { Model } from "mongoose";

export type IProduct = {
  id: string;
  image: string;
  title: string;
  price: number;
  size: "XL" | "L" | "M";
};

export type IProductModel = Model<IProduct>;
