"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorhandler = void 0;
const config_1 = __importDefault(require("../../config"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const handleCastError_1 = __importDefault(require("../../errors/handleCastError"));
const handlevalidationError_1 = require("../../errors/handlevalidationError");
const globalErrorhandler = (error, req, res, next) => {
    let statuscode = 500;
    let message = "something went wrong";
    let errormessages = [];
    config_1.default.env !== "production";
    console.log(error);
    if (error.name === "ValidationError") {
        const siplifiedErrors = (0, handlevalidationError_1.handleValidationErrors)(error);
        statuscode = siplifiedErrors.statusCode;
        errormessages = siplifiedErrors.errormessages;
        message = siplifiedErrors.message;
    }
    else if ((error === null || error === void 0 ? void 0 : error.status) === 403) {
        message = error.message;
        statuscode = error.status;
    }
    else if (error instanceof Error) {
        message = error.message;
        errormessages = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: "",
                    message: error === null || error === void 0 ? void 0 : error.message,
                },
            ]
            : [];
    }
    else if (error.name === "CastError") {
        const simplifiedError = (0, handleCastError_1.default)(error);
        statuscode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errormessages = simplifiedError.errorMessages;
    }
    else if (error instanceof ApiError_1.default) {
        statuscode = error === null || error === void 0 ? void 0 : error.statusCode;
        message = error.message;
        errormessages = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: "",
                    message: error === null || error === void 0 ? void 0 : error.message,
                },
            ]
            : [];
    }
    res.status(statuscode).json({
        success: false,
        message,
        errormessages,
        stack: config_1.default.env !== "production" ? error.stack : undefined,
    });
    next();
};
exports.globalErrorhandler = globalErrorhandler;
