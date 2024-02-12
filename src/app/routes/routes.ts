import express from "express";
// import { loginRouter } from '../Modules/auth/auth.router'
import { cartRouter } from "../Modules/cart/cart.router";
import { checkoutRouter } from "../Modules/checkout/checkout.router";
import { productRouter } from "../Modules/product/product.router";
import { userRouter } from "../Modules/users/user.router";
const router = express.Router();

const moduleRoutes = [
  {
    path: "/product",
    route: productRouter,
  },
  {
    path: "/checkout",
    route: checkoutRouter,
  },
  {
    path: "/cart",
    route: cartRouter,
  },
  {
    path: "/stripe",
    route: cartRouter,
  },

  {
    path: "/user",
    route: userRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
