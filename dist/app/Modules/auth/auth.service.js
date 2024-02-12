"use strict";
// /* eslint-disable no-console */
// import httpStatus from 'http-status'
// import { Secret } from 'jsonwebtoken'
// import config from '../../../config'
// import ApiError from '../../../errors/ApiError'
// import { jwtHelpers } from '../../../helper/jwtHelpers'
// import { User } from '../users/user.model'
// import { IAuth, ILoginResponse, IRefreshTokenAccess } from './auth.interface'
// // get all admins
// // update student
// const loginUser = async (payload: IAuth): Promise<ILoginResponse> => {
//   const { id, password } = payload
//   const user = new User()
//   const userData = await user.isUserExist(id)
//   if (!userData) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'User not found')
//   }
//   if (userData && !user.isPasswordExist(password, userData.password)) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'User not found')
//   }
//   const { id: useId, role, needPasswordChange } = userData
//   const accessToken = jwtHelpers.createToken(
//     { useId, role },
//     config.jwt.jwt_secret as Secret,
//     String(config.jwt.jwt_exipired) as string,
//   )
//   const refreshToken = jwtHelpers.createToken(
//     { useId, role },
//     config.jwt.jwt_refresh_secret as Secret,
//     String(config.jwt.jwt_refresh_exipired) as string,
//   )
//   return { accessToken, refreshToken, needPasswordChange }
// }
// // refresh token service
// const refreshToken = async (token: string): Promise<IRefreshTokenAccess> => {
//   const user = new User()
//   let verifiedToken
//   try {
//     verifiedToken = jwtHelpers.verifyToken(
//       token,
//       config.jwt.jwt_refresh_secret as Secret,
//     )
//     console.log(verifiedToken)
//   } catch (err) {
//     throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token')
//   }
//   const { useId } = verifiedToken
//   const isUserExist = await user.isUserExist(useId)
//   if (!isUserExist) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'User not found')
//   }
//   const newAccessToken = jwtHelpers.createToken(
//     { id: isUserExist.id, role: isUserExist.role },
//     config.jwt.jwt_secret as Secret,
//     String(config.jwt.jwt_exipired) as string,
//   )
//   return {
//     accessToken: newAccessToken,
//   }
// }
// export const AuthService = {
//   loginUser,
//   refreshToken,
// }
