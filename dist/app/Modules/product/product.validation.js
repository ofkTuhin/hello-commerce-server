"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidaion = void 0;
const zod_1 = require("zod");
const createProductZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        price: zod_1.z.string().optional(),
        size: zod_1.z.string().optional(),
    }),
});
exports.ProductValidaion = {
    createProductZodSchema,
};
