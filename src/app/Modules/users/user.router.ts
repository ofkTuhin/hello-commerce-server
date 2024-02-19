import express from "express";
import zodValidationHandler from "../../middleware/zodValidationHandler";
import userController from "./user.controller";
import { userZodValiadion } from "./user.validation";
const router = express.Router();

router.post(
  "/",
  zodValidationHandler(userZodValiadion.createUserZodSchema),
  userController.createaUserController,
);
router.post(
  "/login",
  zodValidationHandler(userZodValiadion.loginZodSchema),
  userController.loginUser,
);
router.get(
  "/refresh-token",

  userController.refreshToken,
);

export const userRouter = router;
