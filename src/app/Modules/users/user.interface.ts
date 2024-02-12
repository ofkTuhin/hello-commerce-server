/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

export type UserSchema = {
  id: string;
  email: string;
  password: string;
  stripe_customer_id: string;
};

export type IUserMethod = {
  isUserExist(
    id: string,
  ): Promise<Pick<UserSchema, "id" | "password" | "email"> | null>;
  isPasswordExist(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>;
};

export type ILoginResponse = {
  accessToken: string;
  refreshToken?: string;
};

export type IRefreshTokenAccess = {
  accessToken: string;
};

export type UserModel = Model<UserSchema, object, IUserMethod>;
