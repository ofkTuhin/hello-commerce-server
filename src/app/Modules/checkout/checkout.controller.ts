/* eslint-disable no-console */
import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../share/catchAsync";
import { sendResponse } from "../../../share/sendResponse";
import { ICheckout } from "./checkout.interface";
import { CheckoutService } from "./checkout.service";

// create checkout
const creatCheckoutCollection = catchAsync(
  async (req: Request, res: Response) => {
    const checkout = req.body;

    const insertCheckout =
      await CheckoutService.creatCheckoutCollection(checkout);
    console.log(insertCheckout);
    sendResponse<ICheckout>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Checkout retrieved successfully !",
    });
  }
);

const getAllCheckouts = catchAsync(async (req: Request, res: Response) => {
  const allCheckouts = await CheckoutService.getAllCheckouts();
  sendResponse<ICheckout[]>(res, {
    success: true,
    message: "all students fetched successfully",
    result: allCheckouts,
  });
});

// update checkout

const updateCheckout = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body.updatedCheckout;
  // console.log(first)
  const result = await CheckoutService.updateCheckout(id, updatedData);
  sendResponse<ICheckout>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "update checkout successfully !",
    result: result,
  });
});

// // delete checkout
const deleteCheckout = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await CheckoutService.deleteCheckout(id);

  sendResponse<ICheckout>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Checkout deleted successfully !",
    result: result,
  });
});

export const checkoutController = {
  getAllCheckouts,
  updateCheckout,
  deleteCheckout,
  creatCheckoutCollection,
};
