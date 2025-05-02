import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import { paymentAPI } from "../../api/payment/payment";

export const makePayment = async (
  courseId: string,
) => {
  const stripeKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
  const stripe = await loadStripe(stripeKey || "");

  if (!stripe) {
    return toast.error(
      "Failed to load payment gateway. Please try again later."
    );
  }

  try {
    const response = await paymentAPI.createCheckOutSession(courseId);

    if (response.status !== 200 || !response.data.id) {
      return toast.error(
        "Payment session could not be initiated. Please try again."
      );
    }

    // Redirect user to Stripe Checkout
    const { error } = await stripe.redirectToCheckout({
      sessionId: response.data.id,
    });

    if (error) {
      throw new Error(error.message || "Payment failed");
    }

  } catch (error) {
    toast.error("Payment process failed. Please try again.");
    console.error("Payment Error:", error);
  }
};
