"use strict";
// /* eslint-disable no-console */
// import { Request, Response } from 'express'
// import httpStatus from 'http-status'
// import config from '../../../config'
// import catchAsync from '../../../share/catchAsync'
// import { sendResponse } from '../../../share/sendResponse'
// import { ILoginResponse } from './auth.interface'
// import { AuthService } from './auth.service'
// // update semester
// const loginUser = catchAsync(async (req: Request, res: Response) => {
//   const loginUserData = req.body
//   const result = await AuthService.loginUser(loginUserData)
//   const { refreshToken, ...others } = result
//   const cookieOption = {
//     secure: config.env === 'production',
//     httpOnly: true,
//   }
//   res.cookie('refreshToken', refreshToken, cookieOption)
//   sendResponse<ILoginResponse>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'you are login successfully !',
//     result: others,
//     // result: result,
//   })
// })
// const refreshToken = catchAsync(async (req: Request, res: Response) => {
//   const { refreshToken } = req.cookies
//   console.log(req.cookies, 'cookies')
//   const result = await AuthService.refreshToken(refreshToken)
//   // set refresh token into cookie
//   const cookieOptions = {
//     secure: config.env === 'production',
//     httpOnly: true,
//   }
//   res.cookie('refreshToken', refreshToken, cookieOptions)
//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: 'User logged in successfully !',
//     result: result,
//   })
// })
// export const authController = {
//   loginUser,
//   refreshToken,
// }
