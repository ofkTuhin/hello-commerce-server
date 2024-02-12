import express from "express";
// import { ENUM_USER_ROLES } from '../../../enums/user'
// import auth from '../../middleware/auth'
import auth from "../../middleware/auth";
import zodValidationHandler from "../../middleware/zodValidationHandler";
import { productController } from "./product.controller";
import { ProductValidaion } from "./product.validation";
// import { StudentValidaion } from './product.validation'
const router = express.Router();
router.post(
  "/",
  zodValidationHandler(ProductValidaion.createProductZodSchema),
  productController.creatProductCollection
);
router.get("/", productController.getAllProducts);

router.patch(
  "/:id",

  auth(),
  productController.updateProduct
);

// update comment

export const productRouter = router;
