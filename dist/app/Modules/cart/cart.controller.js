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
exports.cartController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../share/catchAsync"));
const sendResponse_1 = require("../../../share/sendResponse");
const cart_service_1 = require("./cart.service");
// create cart
const creatCartCollection = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = req.body;
    const insertCart = yield cart_service_1.CartService.creatCartCollection(cart);
    console.log(insertCart);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Cart retrieved successfully !",
    });
}));
const getAllCarts = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allCarts = yield cart_service_1.CartService.getAllCarts();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "all students fetched successfully",
        result: allCarts,
    });
}));
// update cart
const updateCart = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = req.body.updatedCart;
    // console.log(first)
    const result = yield cart_service_1.CartService.updateCart(id, updatedData);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "update cart successfully !",
        result: result,
    });
}));
// // delete cart
const deleteCart = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield cart_service_1.CartService.deleteCart(id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Cart deleted successfully !",
        result: result,
    });
}));
exports.cartController = {
    getAllCarts,
    updateCart,
    deleteCart,
    creatCartCollection,
};
