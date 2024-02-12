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
exports.CartService = void 0;
/* eslint-disable no-console */
// /* eslint-disable no-console */
// import httpStatus from 'http-status'
// import ApiError from '../../../errors/ApiError'
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const cart_model_1 = require("./cart.model");
// import { User } from '../users/user.model'
// get all students
const creatCartCollection = (cart) => __awaiter(void 0, void 0, void 0, function* () {
    const insertCart = yield cart_model_1.Cart.create(cart);
    return insertCart;
});
const getAllCarts = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cart_model_1.Cart.find({}).populate({
        path: "item.product_id",
        model: "Product",
    });
    return result;
});
// get single semster
const getSingleCart = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cart_model_1.Cart.findOne({ id });
    return result;
});
// update student
const updateCart = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existCart = yield cart_model_1.Cart.findOne({ id: id });
    if (!existCart) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Cart not found");
    }
    const updateCartData = Object.assign({}, payload);
    // local guardian
    const result = yield cart_model_1.Cart.findOneAndUpdate({ id }, updateCartData, {
        new: true,
    });
    return result;
});
// get review
const getSingleCartReview = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cart_model_1.Cart.findOne({ id }, { reviews: 1 });
    return result;
});
// // delete book
const deleteCart = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existCart = cart_model_1.Cart.findOne({ id });
    if (!existCart) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Cart not found");
    }
    const deletedCart = yield cart_model_1.Cart.findOneAndDelete({ id }, { new: true });
    return deletedCart;
});
//  add comment
const addComment = (id, comment) => __awaiter(void 0, void 0, void 0, function* () {
    const update = yield cart_model_1.Cart.findOneAndUpdate({
        id: id,
    }, {
        $push: {
            reviews: comment,
        },
    }, { new: true });
    console.log(update);
});
exports.CartService = {
    getAllCarts,
    creatCartCollection,
    getSingleCart,
    updateCart,
    deleteCart,
    getSingleCartReview,
    addComment,
};
