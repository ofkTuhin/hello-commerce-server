/* eslint-disable no-console */
import { NextFunction, Request, Response } from "express";
import { Secret } from "jsonwebtoken";
import config from "../../config";
import ApiError from "../../errors/ApiError";
import { jwtHelpers } from "../../helper/jwtHelpers";

const auth = () => (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    let verifiedUser = null;
    verifiedUser = jwtHelpers.verifyToken(
      token as string,
      config.jwt.jwt_secret as Secret
    );
    req.user = verifiedUser;
    if (verifiedUser) {
      next();
    } else {
      throw new ApiError(401, "unauthenticate user", "");
    }
  } catch (error) {
    next({
      status: 403,
      message: "invalid password",
    });
  }
};

export default auth;
