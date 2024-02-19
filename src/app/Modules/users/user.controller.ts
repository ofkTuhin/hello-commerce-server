/* eslint-disable no-console */
import { Request, Response } from "express";
import httpStatus from "http-status";
import config from "../../../config";
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
  const { refreshToken, ...others } = result;
  const cookieOption = {
    secure: config.env === "production",
    httpOnly: true,
  };

  res.cookie("refreshToken", refreshToken, cookieOption);
  sendResponse<ILoginResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "you are login successfully !",
    result: others,
    // result: result,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await UserService.refreshToken(refreshToken);

  // set refresh token into cookie

  res.cookie("refreshToken", refreshToken);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User logged in successfully !",
    result: result,
  });
});

export default {
  createaUserController,
  loginUser,
  refreshToken,
};
