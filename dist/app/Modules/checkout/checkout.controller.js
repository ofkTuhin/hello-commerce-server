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
exports.checkoutController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../share/catchAsync"));
const sendResponse_1 = require("../../../share/sendResponse");
const checkout_service_1 = require("./checkout.service");
// create checkout
const creatCheckoutCollection = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const checkout = req.body;
    const insertCheckout = yield checkout_service_1.CheckoutService.creatCheckoutCollection(checkout);
    console.log(insertCheckout);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Checkout retrieved successfully !",
    });
}));
const getAllCheckouts = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allCheckouts = yield checkout_service_1.CheckoutService.getAllCheckouts();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "all students fetched successfully",
        result: allCheckouts,
    });
}));
// update checkout
const updateCheckout = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = req.body.updatedCheckout;
    // console.log(first)
    const result = yield checkout_service_1.CheckoutService.updateCheckout(id, updatedData);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "update checkout successfully !",
        result: result,
    });
}));
// // delete checkout
const deleteCheckout = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield checkout_service_1.CheckoutService.deleteCheckout(id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Checkout deleted successfully !",
        result: result,
    });
}));
exports.checkoutController = {
    getAllCheckouts,
    updateCheckout,
    deleteCheckout,
    creatCheckoutCollection,
};
