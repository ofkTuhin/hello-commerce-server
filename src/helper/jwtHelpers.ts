/* eslint-disable no-console */
import jwt, { JwtPayload, Secret } from "jsonwebtoken";

const createToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expires: string
): string => {
  console.log(payload);
  return jwt.sign(
    { id: payload?.userId, email: payload.email },
    secret as Secret,
    {
      expiresIn: expires,
    }
  );
};

const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};
export const jwtHelpers = {
  createToken,
  verifyToken,
};
