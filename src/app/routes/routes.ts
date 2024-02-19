import express from "express";
// import { loginRouter } from '../Modules/auth/auth.router'
import { cartRouter } from "../Modules/cart/cart.router";

import { productRouter } from "../Modules/product/product.router";
import { stripeRouter } from "../Modules/stripe/stripe.route";
import { userRouter } from "../Modules/users/user.router";
const router = express.Router();

const moduleRoutes = [
  {
    path: "/product",
    route: productRouter,
  },

  {
    path: "/cart",
    route: cartRouter,
  },
  {
    path: "/stripe",
    route: stripeRouter,
  },

  {
    path: "/user",
    route: userRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
