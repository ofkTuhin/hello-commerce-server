/* eslint-disable no-console */
// /* eslint-disable no-console */
// import httpStatus from 'http-status'
// import ApiError from '../../../errors/ApiError'
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { ICheckout } from "./checkout.interface";
import { Checkout } from "./checkout.model";
// import { User } from '../users/user.model'

// get all students

const creatCheckoutCollection = async (
  checkout: ICheckout
): Promise<ICheckout> => {
  const insertCheckout = await Checkout.create(checkout);
  return insertCheckout;
};

const getAllCheckouts = async (): Promise<ICheckout[]> => {
  const result = await Checkout.find({}).populate({
    path: "item.product_id",
    model: "Product",
  });
  return result;
};

// get single semster
const getSingleCheckout = async (id: string): Promise<ICheckout | null> => {
  const result = await Checkout.findOne({ id });
  return result;
};
// update student
const updateCheckout = async (
  id: string,
  payload: Partial<ICheckout>
): Promise<ICheckout | null> => {
  const existCheckout = await Checkout.findOne({ id: id });
  if (!existCheckout) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Checkout not found");
  }
  const updateCheckoutData: Partial<ICheckout> = {
    ...payload,
  };
  // local guardian

  const result = await Checkout.findOneAndUpdate({ id }, updateCheckoutData, {
    new: true,
  });
  return result;
};

// get review
const getSingleCheckoutReview = async (
  id: string
): Promise<ICheckout | null> => {
  const result = await Checkout.findOne({ id }, { reviews: 1 });
  return result;
};
// // delete book
const deleteCheckout = async (id: string): Promise<ICheckout | null> => {
  const existCheckout = Checkout.findOne({ id });
  if (!existCheckout) {
    throw new ApiError(httpStatus.NOT_FOUND, "Checkout not found");
  }
  const deletedCheckout = await Checkout.findOneAndDelete(
    { id },
    { new: true }
  );
  return deletedCheckout;
};
//  add comment
const addComment = async (id: string, comment: string) => {
  const update = await Checkout.findOneAndUpdate(
    {
      id: id,
    },
    {
      $push: {
        reviews: comment,
      },
    },
    { new: true }
  );
  console.log(update);
};
export const CheckoutService = {
  getAllCheckouts,
  creatCheckoutCollection,
  getSingleCheckout,
  updateCheckout,
  deleteCheckout,
  getSingleCheckoutReview,
  addComment,
};
