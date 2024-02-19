/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response } from "express";
import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = new Stripe(stripeSecretKey!, {
  apiVersion: "2023-10-16",
});

const paymentIntent = async (req: Request, res: Response) => {
  const { total } = req.body || {};
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "EUR",
      amount: Math.ceil(total),
      automatic_payment_methods: { enabled: true },
    });

    // Send publishable key and PaymentIntent details to client
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e: any) {
    console.log(e);
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
};
export { paymentIntent };
