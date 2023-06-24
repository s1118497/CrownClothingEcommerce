import { loadStripe } from "@stripe/stripe-js";

// create a stripe instance with public key, which identify our application to stripe
export const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY as string);
