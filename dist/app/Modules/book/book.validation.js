"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidaion = void 0;
const zod_1 = require("zod");
const updateProductZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    title: zod_1.z.string().optional(),
    author: zod_1.z.string().optional(),
    genre: zod_1.z.string().optional(),
    publication_date: zod_1.z.string().optional(),
  }),
});
exports.ProductValidaion = {
  updateProductZodSchema,
};
