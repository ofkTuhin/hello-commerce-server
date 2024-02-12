"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkoutRouter = void 0;
const express_1 = __importDefault(require("express"));
// import { ENUM_USER_ROLES } from '../../../enums/user'
// import auth from '../../middleware/auth'
const auth_1 = __importDefault(require("../../middleware/auth"));
const checkout_controller_1 = require("./checkout.controller");
// import { StudentValidaion } from './checkout.validation'
const router = express_1.default.Router();
router.post("/", checkout_controller_1.checkoutController.creatCheckoutCollection);
router.get("/", checkout_controller_1.checkoutController.getAllCheckouts);
// review
router.delete("/:id", 
//   auth(ENUM_USER_ROLES.ADMIN, ENUM_USER_ROLES.SUPER_ADMIN),
checkout_controller_1.checkoutController.deleteCheckout);
router.patch("/:id", 
//   auth(
//     ENUM_USER_ROLES.ADMIN,
//     ENUM_USER_ROLES.SUPER_ADMIN,
//     ENUM_USER_ROLES.STUDENT,
//   ),
(0, auth_1.default)(), checkout_controller_1.checkoutController.updateCheckout);
// update comment
exports.checkoutRouter = router;
