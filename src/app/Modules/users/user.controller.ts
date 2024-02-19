/* eslint-disable no-console */
import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../share/catchAsync";
import { sendResponse } from "../../../share/sendResponse";
import { ILoginResponse } from "./user.interface";
import { UserService } from "./user.service";

const createaUserController = catchAsync(
  async (req: Request, res: Response) => {
    const userData = req.body;
    const user = await UserService.createUser(userData);
    sendResponse(res, {
      success: true,
      message: "user created successfully",
      result: user,
    });
  },
);

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const loginUserData = req.body;
  const result = await UserService.loginUser(loginUserData);

  sendResponse<ILoginResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "you are login successfully !",
    result: result,
    // result: result,
  });
});

export default {
  createaUserController,
  loginUser,
};
