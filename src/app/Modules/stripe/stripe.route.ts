import express from "express";
import { checkout } from "./stripe";
const router = express.Router();
router.post("/checkout", checkout);

export const stripeRouter = router;
