"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRouter = void 0;
const express_1 = __importDefault(require("express"));
// import { ENUM_USER_ROLES } from '../../../enums/user'
// import auth from '../../middleware/auth'
const zodValidationHandler_1 = __importDefault(
  require("../../middleware/zodValidationHandler")
);
const book_controller_1 = require("./book.controller");
const book_validation_1 = require("./book.validation");
// import { StudentValidaion } from './book.validation'
const router = express_1.default.Router();
router.get(
  "/",
  //   auth(
  //     ENUM_USER_ROLES.ADMIN,
  //     ENUM_USER_ROLES.SUPER_ADMIN,
  //     ENUM_USER_ROLES.STUDENT,
  //   ),
  book_controller_1.bookController.getAllProducts
);
router.get(
  "/:id",
  //   auth(
  //     ENUM_USER_ROLES.ADMIN,
  //     ENUM_USER_ROLES.SUPER_ADMIN,
  //     ENUM_USER_ROLES.STUDENT,
  //   ),
  book_controller_1.bookController.getSingleProduct
);
router.delete(
  "/:id",
  //   auth(ENUM_USER_ROLES.ADMIN, ENUM_USER_ROLES.SUPER_ADMIN),
  book_controller_1.bookController.deleteProduct
);
router.patch(
  "/:id",
  //   auth(
  //     ENUM_USER_ROLES.ADMIN,
  //     ENUM_USER_ROLES.SUPER_ADMIN,
  //     ENUM_USER_ROLES.STUDENT,
  //   ),
  (0, zodValidationHandler_1.default)(
    book_validation_1.ProductValidaion.updateProductZodSchema
  ),
  book_controller_1.bookController.updateProduct
);
exports.bookRouter = router;
