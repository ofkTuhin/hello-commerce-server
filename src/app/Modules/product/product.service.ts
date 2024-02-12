/* eslint-disable no-console */
// /* eslint-disable no-console */
// import httpStatus from 'http-status'
// import ApiError from '../../../errors/ApiError'
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IProduct } from "./product.interface";
import { Product } from "./product.model";
// import { User } from '../users/user.model'

// get all students

const creatProductCollection = async (book: IProduct): Promise<IProduct> => {
  const bookArray = await Product.find({}, { id: 1 });
  const maxId = Math.max(...bookArray.map((item) => Number(item.id)));

  book.id = `${Number(maxId) + 1}`;
  const insertProduct = await Product.create(book);
  return insertProduct;
};

const getAllProducts = async (): Promise<IProduct[]> => {
  const result = await Product.find({});
  return result;
};

// update student
const updateProduct = async (
  id: string,
  payload: Partial<IProduct>
): Promise<IProduct | null> => {
  const existProduct = await Product.findOne({ id: id });
  if (!existProduct) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Product not found");
  }
  const updateProductData: Partial<IProduct> = {
    ...payload,
  };
  // local guardian

  const result = await Product.findOneAndUpdate({ id }, updateProductData, {
    new: true,
  });
  return result;
};

export const ProductService = {
  getAllProducts,
  creatProductCollection,
  updateProduct,
};
