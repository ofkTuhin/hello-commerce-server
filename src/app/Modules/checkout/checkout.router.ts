import express from "express";
// import { ENUM_USER_ROLES } from '../../../enums/user'
// import auth from '../../middleware/auth'
import auth from "../../middleware/auth";
import { checkoutController } from "./checkout.controller";
// import { StudentValidaion } from './checkout.validation'
const router = express.Router();
router.post("/", checkoutController.creatCheckoutCollection);
router.get("/", checkoutController.getAllCheckouts);

// review
router.delete(
  "/:id",
  //   auth(ENUM_USER_ROLES.ADMIN, ENUM_USER_ROLES.SUPER_ADMIN),
  checkoutController.deleteCheckout
);
router.patch(
  "/:id",
  //   auth(
  //     ENUM_USER_ROLES.ADMIN,
  //     ENUM_USER_ROLES.SUPER_ADMIN,
  //     ENUM_USER_ROLES.STUDENT,
  //   ),
  auth(),
  checkoutController.updateCheckout
);

// update comment

export const checkoutRouter = router;
