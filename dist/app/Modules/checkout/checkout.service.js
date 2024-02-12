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
exports.CheckoutService = void 0;
/* eslint-disable no-console */
// /* eslint-disable no-console */
// import httpStatus from 'http-status'
// import ApiError from '../../../errors/ApiError'
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const checkout_model_1 = require("./checkout.model");
// import { User } from '../users/user.model'
// get all students
const creatCheckoutCollection = (checkout) => __awaiter(void 0, void 0, void 0, function* () {
    const insertCheckout = yield checkout_model_1.Checkout.create(checkout);
    return insertCheckout;
});
const getAllCheckouts = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield checkout_model_1.Checkout.find({}).populate({
        path: "item.product_id",
        model: "Product",
    });
    return result;
});
// get single semster
const getSingleCheckout = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield checkout_model_1.Checkout.findOne({ id });
    return result;
});
// update student
const updateCheckout = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existCheckout = yield checkout_model_1.Checkout.findOne({ id: id });
    if (!existCheckout) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Checkout not found");
    }
    const updateCheckoutData = Object.assign({}, payload);
    // local guardian
    const result = yield checkout_model_1.Checkout.findOneAndUpdate({ id }, updateCheckoutData, {
        new: true,
    });
    return result;
});
// get review
const getSingleCheckoutReview = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield checkout_model_1.Checkout.findOne({ id }, { reviews: 1 });
    return result;
});
// // delete book
const deleteCheckout = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existCheckout = checkout_model_1.Checkout.findOne({ id });
    if (!existCheckout) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Checkout not found");
    }
    const deletedCheckout = yield checkout_model_1.Checkout.findOneAndDelete({ id }, { new: true });
    return deletedCheckout;
});
//  add comment
const addComment = (id, comment) => __awaiter(void 0, void 0, void 0, function* () {
    const update = yield checkout_model_1.Checkout.findOneAndUpdate({
        id: id,
    }, {
        $push: {
            reviews: comment,
        },
    }, { new: true });
    console.log(update);
});
exports.CheckoutService = {
    getAllCheckouts,
    creatCheckoutCollection,
    getSingleCheckout,
    updateCheckout,
    deleteCheckout,
    getSingleCheckoutReview,
    addComment,
};
