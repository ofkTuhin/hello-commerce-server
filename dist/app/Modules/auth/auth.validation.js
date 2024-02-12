"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginValidaion = void 0;
const zod_1 = require("zod");
const loginZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string({ required_error: 'id is required' }),
        password: zod_1.z.string({ required_error: 'password is required' }),
    }),
});
const refreshTokenZodSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: 'Refresh Token is required',
        }),
    }),
});
exports.LoginValidaion = {
    loginZodSchema,
    refreshTokenZodSchema,
};
