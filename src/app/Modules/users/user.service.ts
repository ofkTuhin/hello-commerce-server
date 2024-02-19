/* eslint-disable no-console */
import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { jwtHelpers } from "../../../helper/jwtHelpers";
import { UserSchema } from "./user.interface";
import { User } from "./user.model";

const createUser = async (user: UserSchema): Promise<UserSchema> => {
  const [newUser] = await User.create([user]);
  return newUser;
};

const loginUser = async (payload: UserSchema) => {
  const { email: id, password } = payload;
  const user = new User();
  const userData = await user.isUserExist(id);
  if (!userData) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User not found");
  }

  if (userData && !user.isPasswordExist(password, userData.password)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User not found");
  }

  const { name, email } = userData;
  const accessToken = jwtHelpers.createToken(
    { name, email },
    config.jwt.jwt_secret as Secret,
    String(config.jwt.jwt_exipired) as string,
  );

  return { accessToken, email, name };
};

// refresh token service

export const UserService = {
  createUser,
  loginUser,
};
