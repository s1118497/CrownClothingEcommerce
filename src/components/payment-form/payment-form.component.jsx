import { useState } from "react";
import { useSelector } from "react-redux";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";

import { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { PaymentFormContainer, FormContainer, PaymentButton } from "./payment-form.style";

export default function PaymentForm() {
	const [isProcessingPayment, setIsProcessingPayment] = useState(false);

	// https://stripe.com/docs/stripe-js/react#usestripe-hook
	const stripe = useStripe();
	// https://stripe.com/docs/stripe-js/react#useelements-hook
	const elements = useElements();

	const amount = useSelector(selectCartTotal);
	const currentUser = useSelector(selectCurrentUser);

	const paymentHandler = async (e) => {
		e.preventDefault();
		// make sure stripe and elements loaded in when submit, stripe = null if stripePromise pending
		if (!stripe || !elements) return;

		setIsProcessingPayment(true);

		// netlify cli dev will search the functions directory then create a api endpoint for fetching
		const response = await fetch("/.netlify/functions/create-payment-intent", {
			method: "post",
			header: {
				"Content-Type": "application/json",
			},
			// stripe default take value as cent, 1 dollar is equal to 100 cent.
			body: JSON.stringify({ amount: amount * 100 }),
		}).then((res) => res.json());

		// a client_secret from stripe server for binding each payment intent
		const { client_secret } = response;

		const paymentResult = await stripe.confirmCardPayment(client_secret, {
			payment_method: {
				card: elements.getElement(CardElement),
				billing_details: {
					name: currentUser ? currentUser.displayName : "guest",
				},
			},
		});

		setIsProcessingPayment(false);

		if (paymentResult.error) alert(paymentResult.error.message);
		else if (paymentResult.paymentIntent.status === "succeeded") alert("Payment Successful");
	};

	return (
		<PaymentFormContainer>
			<FormContainer onSubmit={paymentHandler}>
				<h2>Credit Card Payment: </h2>
				{/* stripe test visa card no: 4242 4242 4242 4242 */}
				<CardElement />
				<PaymentButton
					isLoading={isProcessingPayment}
					btnType={BUTTON_TYPE_CLASSES.inverted}>
					Pay Now
				</PaymentButton>
			</FormContainer>
		</PaymentFormContainer>
	);
}
