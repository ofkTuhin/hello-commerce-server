/* eslint-disable no-console */
import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { jwtHelpers } from "../../../helper/jwtHelpers";
import { IRefreshTokenAccess, UserSchema } from "./user.interface";
import { User } from "./user.model";

const createUser = async (user: UserSchema): Promise<UserSchema> => {
  console.log(user);
  const id = user.email.split("@")[0];
  user.id = id;
  const [newUser] = await User.create([user]);
  return newUser;
};

const loginUser = async (payload: UserSchema) => {
  const { email: id, password } = payload;
  const user = new User();
  const userData = await user.isUserExist(id);
  console.log({ userData });
  if (!userData) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User not found");
  }

  if (userData && !user.isPasswordExist(password, userData.password)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User not found");
  }

  const { id: userId, email } = userData;

  const accessToken = jwtHelpers.createToken(
    { userId, email },
    config.jwt.jwt_secret as Secret,
    String(config.jwt.jwt_exipired) as string,
  );

  const refreshToken = jwtHelpers.createToken(
    { userId, email },
    config.jwt.jwt_refresh_secret as Secret,
    String(config.jwt.jwt_refresh_exipired) as string,
  );
  return { accessToken, refreshToken, email };
};

// refresh token service
const refreshToken = async (token: string): Promise<IRefreshTokenAccess> => {
  const user = new User();
  let verifiedToken;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.jwt_refresh_secret as Secret,
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid Refresh Token");
  }
  const { email } = verifiedToken;
  const isUserExist = await user.isUserExist(email);
  if (!isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User not found");
  }
  const newAccessToken = jwtHelpers.createToken(
    { id: isUserExist.id, email: isUserExist.email },
    config.jwt.jwt_secret as Secret,
    String(config.jwt.jwt_exipired) as string,
  );
  return {
    accessToken: newAccessToken,
  };
};
export const UserService = {
  createUser,
  loginUser,
  refreshToken,
};
