/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response } from "express";
import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = new Stripe(stripeSecretKey!, {
  apiVersion: "2023-10-16",
});

const checkout = async (req: Request, res: Response) => {
  try {
    const { items } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item: any) => ({
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
      success_url: "http://localhost:3000/success", // Update with your success URL
      cancel_url: "http://localhost:3000/cancel", // Update with your cancel URL
    });

    res.json({ id: session.id });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { checkout };
