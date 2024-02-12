"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkout = void 0;
const stripe_1 = __importDefault(require("stripe"));
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = new stripe_1.default(stripeSecretKey, {
    apiVersion: "2023-10-16",
});
const checkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { items } = req.body;
        const session = yield stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: items.map((item) => ({
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: item.price * 100, // Stripe uses amount in cents
                },
                quantity: item.quantity,
            })),
            mode: "payment",
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel", // Update with your cancel URL
        });
        res.json({ id: session.id });
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.checkout = checkout;
