/* eslint-disable no-console */
import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../share/catchAsync";
import { sendResponse } from "../../../share/sendResponse";
import { IProduct } from "./product.interface";
import { ProductService } from "./product.service";

// create product
const creatProductCollection = catchAsync(
  async (req: Request, res: Response) => {
    const product = req.body;

    const insertProduct = await ProductService.creatProductCollection(product);
    console.log(insertProduct);
    sendResponse<IProduct>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Product add successfully !",
    });
  }
);

const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const allProducts = await ProductService.getAllProducts();
  sendResponse<IProduct[]>(res, {
    success: true,
    message: "all students fetched successfully",
    result: allProducts,
  });
});

// update product

const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body.updatedProduct;
  // console.log(first)
  const result = await ProductService.updateProduct(id, updatedData);
  sendResponse<IProduct>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "update product successfully !",
    result: result,
  });
});

export const productController = {
  getAllProducts,
  updateProduct,
  creatProductCollection,
};
