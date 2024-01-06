import dotenv from "dotenv";
import express from "express";
import stripePackage from "stripe";

dotenv.config();

const stripeRoute = express.Router();

// Initialize Stripe with your secret key
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripePackage(stripeSecretKey);

stripeRoute.post("/create-checkout-session", async (req, res) => {
	const session = await stripe.checkout.sessions.create({
		line_items: [
			{
				price_data: {
					currency: "usd",
					product_data: {
						name: "Galaxy X",
					},
					unit_amount: 39900,
				},
				quantity: 1,
			},
		],
		mode: "payment",
		success_url: `${process.env.CLIENT_URL}/checkout-success`,
		cancel_url: `${process.env.CLIENT_URL}/cart`,
	});

	res.send({ url: session.url });
});

export default stripeRoute;
