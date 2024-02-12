import { z } from "zod";

const createUserZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: "email is required",
    }),
    password: z.string({
      required_error: "Password is required",
    }),
    name: z.string().optional(),
  }),
});

const loginZodSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "email is required" }),
    password: z.string({ required_error: "password is required" }),
  }),
});

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: "Refresh Token is required",
    }),
  }),
});
export const userZodValiadion = {
  createUserZodSchema,
  loginZodSchema,
  refreshTokenZodSchema,
};
