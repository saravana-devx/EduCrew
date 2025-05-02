import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

const BACKEND_URL =
  import.meta.env.MODE === 'production'
    ? `${import.meta.env.VITE_BACKEND_URL}`
    : 'http://localhost:4000';


export const api = axios.create({
  withCredentials: true,
  baseURL: `${BACKEND_URL}/api/v1`,
});
/**
 * !Using Promise<never> indicates that this function always throws an error,
 * !so it will never resolve successfully
 */

const errorHandler = (error: AxiosError): Promise<never> => {
  const statusCode: number | undefined = error.response?.status;

  if (!error.response) {
    if (error.message === "Network Error") {
      toast.error(
        "Unable to reach the server. Please check your internet connection or try again later."
      );
    } else {
      window.location.href = "/error";
      toast.error("An unexpected error occurred. Please try again.");
    }
  }
  else {
    switch (statusCode) {
      case 401:
        toast.error("Unauthorized. Redirecting to login...");
        localStorage.clear();
        window.location.href = "/login"; // Redirect user
        break;
      case 500:
        toast.error("Server error. Please try again later.");
        break;
      case 429:
        toast.warn("Too Many Requests! Please try again later.");
        break;
      default:
      // window.location.href = "/error";
      // toast.error("An unexpected error occurred. Please try again.");
    }
  }
  return Promise.reject(error);
};

api.interceptors.response.use(undefined, (error: AxiosError) => {
  return errorHandler(error);
});

export default api;
