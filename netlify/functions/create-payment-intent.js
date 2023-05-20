// running on server-side, so its in commonJS module

require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
	try {
		const { amount } = JSON.parse(event.body);
		const paymentIntent = await stripe.paymentIntents.create({
			amount,
			// All amounts are in the "smallest common currency unit". While in most places this would be cents
			currency: "hkd",
			payment_method_types: ["card"],
		});
		return {
			statusCode: 200,
			body: JSON.stringify(paymentIntent),
		};
	} catch (error) {
		console.log(error);
		return {
			statusCode: 400,
			body: JSON.stringify({ error }),
		};
	}
};
