"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const zodValidationHandler_1 = __importDefault(require("../../middleware/zodValidationHandler"));
const user_controller_1 = __importDefault(require("./user.controller"));
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
router.post("/", (0, zodValidationHandler_1.default)(user_validation_1.userZodValiadion.createUserZodSchema), user_controller_1.default.createaUserController);
router.post("/login", (0, zodValidationHandler_1.default)(user_validation_1.userZodValiadion.loginZodSchema), user_controller_1.default.loginUser);
router.get("/refresh-token", (0, zodValidationHandler_1.default)(user_validation_1.userZodValiadion.refreshTokenZodSchema), user_controller_1.default.refreshToken);
exports.userRouter = router;
