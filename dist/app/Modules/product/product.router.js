"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = __importDefault(require("express"));
// import { ENUM_USER_ROLES } from '../../../enums/user'
// import auth from '../../middleware/auth'
const auth_1 = __importDefault(require("../../middleware/auth"));
const zodValidationHandler_1 = __importDefault(require("../../middleware/zodValidationHandler"));
const product_controller_1 = require("./product.controller");
const product_validation_1 = require("./product.validation");
// import { StudentValidaion } from './product.validation'
const router = express_1.default.Router();
router.post("/", (0, zodValidationHandler_1.default)(product_validation_1.ProductValidaion.createProductZodSchema), product_controller_1.productController.creatProductCollection);
router.get("/", product_controller_1.productController.getAllProducts);
router.patch("/:id", (0, auth_1.default)(), product_controller_1.productController.updateProduct);
// update comment
exports.productRouter = router;
