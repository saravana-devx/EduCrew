import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import { paymentAPI } from "../../api/payment/payment";

export const makePayment = async (
  courseId: string,
  dispatchEnrolledCourse: (courseId: string) => void
) => {
  const stripeKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
  console.log("stripe key ", stripeKey);
  const stripe = await loadStripe(stripeKey || "");
  console.log("stripe");
  if (!stripe) {
    return toast.error(
      "Failed to load payment gateway. Please try again later."
    );
  }

  try {
    const response = await paymentAPI.createCheckOutSession(courseId);
    console.log("response stripe -> ", response);
    // if (response.status !== 200) {
    //   throw new Error("Failed to create checkout session");
    // }

    if (response.status !== 200) {
      toast.error("Payment session could not be initiated. Please try again.");
    }

    if (response.status === 200) {
      await paymentAPI.purchaseCourse(courseId);
      dispatchEnrolledCourse(courseId);
    }
    const redirectResult = await stripe.redirectToCheckout({
      sessionId: response.data.id,
    });

    if (redirectResult.error) {
      throw new Error(redirectResult.error.message || "Payment failed");
    }
  } catch (error) {
    toast.error("Payment process failed. Please try again.");
    console.error("Payment Error:", error);
  }
};
