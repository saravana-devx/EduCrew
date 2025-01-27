import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

export const api = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:4000/api/v1",
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
      toast.error("An unexpected error occurred. Please try again.");
    }
  } else if (statusCode && statusCode !== 401 && statusCode !== 409) {
    console.error(error);
  }
  return Promise.reject(error);
};

api.interceptors.response.use(undefined, (error: AxiosError) => {
  return errorHandler(error);
});

export default api;
