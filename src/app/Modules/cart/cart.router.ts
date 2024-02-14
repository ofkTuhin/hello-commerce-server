import express from "express";
// import { ENUM_USER_ROLES } from '../../../enums/user'
// import auth from '../../middleware/auth'
import { cartController } from "./cart.controller";
// import { StudentValidaion } from './cart.validation'
const router = express.Router();
router.post("/", cartController.creatCartCollection);
router.get("/", cartController.getAllCarts);

// review
router.delete(
  "/:id",
  //   auth(ENUM_USER_ROLES.ADMIN, ENUM_USER_ROLES.SUPER_ADMIN),
  cartController.deleteCart
);
router.patch(
  "/:id",
  //   auth(
  //     ENUM_USER_ROLES.ADMIN,
  //     ENUM_USER_ROLES.SUPER_ADMIN,
  //     ENUM_USER_ROLES.STUDENT,
  //   ),

  // auth(),
  cartController.updateCart
);

// update comment

export const cartRouter = router;
