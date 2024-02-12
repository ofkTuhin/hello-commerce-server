"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import { loginRouter } from '../Modules/auth/auth.router'
const cart_router_1 = require("../Modules/cart/cart.router");
const checkout_router_1 = require("../Modules/checkout/checkout.router");
const product_router_1 = require("../Modules/product/product.router");
const user_router_1 = require("../Modules/users/user.router");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/product",
        route: product_router_1.productRouter,
    },
    {
        path: "/checkout",
        route: checkout_router_1.checkoutRouter,
    },
    {
        path: "/cart",
        route: cart_router_1.cartRouter,
    },
    {
        path: "/stripe",
        route: cart_router_1.cartRouter,
    },
    {
        path: "/user",
        route: user_router_1.userRouter,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
