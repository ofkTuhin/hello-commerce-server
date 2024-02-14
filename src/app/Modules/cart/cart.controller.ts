/* eslint-disable no-console */
import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../share/catchAsync";
import { sendResponse } from "../../../share/sendResponse";
import { ICart } from "./cart.interface";
import { CartService } from "./cart.service";

// create cart
const creatCartCollection = catchAsync(async (req: Request, res: Response) => {
  const cart = req.body;

  const insertCart = await CartService.creatCartCollection(cart);
  console.log(insertCart);
  sendResponse<ICart>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cart retrieved successfully !",
  });
});

const getAllCarts = catchAsync(async (req: Request, res: Response) => {
  const allCarts = await CartService.getAllCarts();
  sendResponse<ICart[]>(res, {
    success: true,
    message: "all students fetched successfully",
    result: allCarts,
  });
});

// update cart

const updateCart = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  // console.log(first)
  const result = await CartService.updateCart(id, updatedData);
  sendResponse<ICart>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "update cart successfully !",
    result: result,
  });
});

// // delete cart
const deleteCart = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await CartService.deleteCart(id);

  sendResponse<ICart>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cart deleted successfully !",
    result: result,
  });
});

export const cartController = {
  getAllCarts,
  updateCart,
  deleteCart,
  creatCartCollection,
};
