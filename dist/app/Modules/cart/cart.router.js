"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRouter = void 0;
const express_1 = __importDefault(require("express"));
// import { ENUM_USER_ROLES } from '../../../enums/user'
// import auth from '../../middleware/auth'
const auth_1 = __importDefault(require("../../middleware/auth"));
const cart_controller_1 = require("./cart.controller");
// import { StudentValidaion } from './cart.validation'
const router = express_1.default.Router();
router.post("/", cart_controller_1.cartController.creatCartCollection);
router.get("/", cart_controller_1.cartController.getAllCarts);
// review
router.delete("/:id", 
//   auth(ENUM_USER_ROLES.ADMIN, ENUM_USER_ROLES.SUPER_ADMIN),
cart_controller_1.cartController.deleteCart);
router.patch("/:id", 
//   auth(
//     ENUM_USER_ROLES.ADMIN,
//     ENUM_USER_ROLES.SUPER_ADMIN,
//     ENUM_USER_ROLES.STUDENT,
//   ),
(0, auth_1.default)(), cart_controller_1.cartController.updateCart);
// update comment
exports.cartRouter = router;
