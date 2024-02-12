"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userZodValiadion = void 0;
const zod_1 = require("zod");
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: "First name is required",
        }),
        password: zod_1.z.string().optional(),
    }),
});
const loginZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: "email is required" }),
        password: zod_1.z.string({ required_error: "password is required" }),
    }),
});
const refreshTokenZodSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: "Refresh Token is required",
        }),
    }),
});
exports.userZodValiadion = {
    createUserZodSchema,
    loginZodSchema,
    refreshTokenZodSchema,
};
