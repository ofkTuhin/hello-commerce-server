"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../config"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const jwtHelpers_1 = require("../../helper/jwtHelpers");
const auth = () => (req, res, next) => {
    try {
        const token = req.headers.authorization;
        let verifiedUser = null;
        verifiedUser = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.jwt_secret);
        req.user = verifiedUser;
        if (verifiedUser) {
            next();
        }
        else {
            throw new ApiError_1.default(401, "unauthenticate user", "");
        }
    }
    catch (error) {
        next({
            status: 403,
            message: "invalid password",
        });
    }
};
exports.default = auth;
