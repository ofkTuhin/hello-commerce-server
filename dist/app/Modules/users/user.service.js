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
exports.UserService = void 0;
/* eslint-disable no-console */
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helper/jwtHelpers");
const user_model_1 = require("./user.model");
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(user);
    const id = user.email.split("@")[0];
    user.id = id;
    const [newUser] = yield user_model_1.User.create([user]);
    return newUser;
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email: id, password } = payload;
    const user = new user_model_1.User();
    const userData = yield user.isUserExist(id);
    if (!userData) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "User not found");
    }
    if (userData && !user.isPasswordExist(password, userData.password)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "User not found");
    }
    const { id: userId, email } = userData;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ userId, email }, config_1.default.jwt.jwt_secret, String(config_1.default.jwt.jwt_exipired));
    console.log(userId, email);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ userId, email }, config_1.default.jwt.jwt_refresh_secret, String(config_1.default.jwt.jwt_refresh_exipired));
    return { accessToken, refreshToken, email };
});
// refresh token service
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new user_model_1.User();
    let verifiedToken;
    try {
        verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.jwt_refresh_secret);
        console.log(verifiedToken);
    }
    catch (err) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Invalid Refresh Token");
    }
    const { email } = verifiedToken;
    const isUserExist = yield user.isUserExist(email);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "User not found");
    }
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken({ id: isUserExist.id, email: isUserExist.email }, config_1.default.jwt.jwt_secret, String(config_1.default.jwt.jwt_exipired));
    return {
        accessToken: newAccessToken,
    };
});
exports.UserService = {
    createUser,
    loginUser,
    refreshToken,
};
