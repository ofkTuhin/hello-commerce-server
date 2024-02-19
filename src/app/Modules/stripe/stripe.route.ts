import express from "express";
import { paymentIntent } from "./stripe";
const router = express.Router();
router.post("/payment-intent", paymentIntent);

export const stripeRouter = router;
