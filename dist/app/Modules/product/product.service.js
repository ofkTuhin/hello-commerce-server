"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
/* eslint-disable no-console */
// /* eslint-disable no-console */
// import httpStatus from 'http-status'
// import ApiError from '../../../errors/ApiError'
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const product_model_1 = require("./product.model");
// import { User } from '../users/user.model'
// get all students
const creatProductCollection = (book) => __awaiter(void 0, void 0, void 0, function* () {
    const bookArray = yield product_model_1.Product.find({}, { id: 1 });
    const maxId = Math.max(...bookArray.map((item) => Number(item.id)));
    book.id = `${Number(maxId) + 1}`;
    const insertProduct = yield product_model_1.Product.create(book);
    return insertProduct;
});
const getAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.find({});
    return result;
});
// update student
const updateProduct = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existProduct = yield product_model_1.Product.findOne({ id: id });
    if (!existProduct) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Product not found");
    }
    const updateProductData = Object.assign({}, payload);
    // local guardian
    const result = yield product_model_1.Product.findOneAndUpdate({ id }, updateProductData, {
        new: true,
    });
    return result;
});
exports.ProductService = {
    getAllProducts,
    creatProductCollection,
    updateProduct,
};
