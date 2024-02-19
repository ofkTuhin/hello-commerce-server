/* eslint-disable no-console */
// /* eslint-disable no-console */
// import httpStatus from 'http-status'
// import ApiError from '../../../errors/ApiError'
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { ICart } from "./cart.interface";
import { Cart } from "./cart.model";
// import { User } from '../users/user.model'

// get all students

const creatCartCollection = async (cart: ICart): Promise<ICart> => {
  const insertCart = await Cart.create(cart);
  return insertCart;
};

const getAllCarts = async (): Promise<ICart[]> => {
  const result = await Cart.find({ user_id: "user" }).populate({
    path: "product",
    model: "Product",
  });
  return result;
};

// get single semster
const getSingleCart = async (id: string): Promise<ICart | null> => {
  const result = await Cart.findOne({ id });
  return result;
};
// update student
const updateCart = async (
  id: string,
  payload: Partial<ICart>
): Promise<ICart | null> => {
  const existCart = await Cart.findOne({ product: id });
  if (!existCart) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Cart not found");
  }
  const updateCartData: Partial<ICart> = {
    ...payload,
  };
  // local guardian

  const result = await Cart.findOneAndUpdate({ product: id }, updateCartData, {
    new: true,
  });
  return result;
};

// get review
const getSingleCartReview = async (id: string): Promise<ICart | null> => {
  const result = await Cart.findOne({ id }, { reviews: 1 });
  return result;
};
// // delete book
const deleteCart = async (id: string): Promise<ICart | null> => {
  const existCart = Cart.findOne({ id });
  if (!existCart) {
    throw new ApiError(httpStatus.NOT_FOUND, "Cart not found");
  }
  const deletedCart = await Cart.findOneAndDelete({ id }, { new: true });
  return deletedCart;
};
//  add comment

export const CartService = {
  getAllCarts,
  creatCartCollection,
  getSingleCart,
  updateCart,
  deleteCart,
  getSingleCartReview,
};
