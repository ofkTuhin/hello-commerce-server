"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtHelpers = void 0;
/* eslint-disable no-console */
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = (payload, secret, expires) => {
    console.log(payload);
    return jsonwebtoken_1.default.sign({ id: payload === null || payload === void 0 ? void 0 : payload.userId, email: payload.email }, secret, {
        expiresIn: expires,
    });
};
const verifyToken = (token, secret) => {
    return jsonwebtoken_1.default.verify(token, secret);
};
exports.jwtHelpers = {
    createToken,
    verifyToken,
};
