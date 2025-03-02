import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { AuthAPI } from "../../../api/auth/AuthAPI";
import Spinner from "../../common/spinner/Spinner";

const EmailSent = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      await AuthAPI.forgetPassword(email);
      toast.success("Reset link sent to your email");
      navigate("/open-gmail");
      setLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        toast.error("Email not exists");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-16 mb-16 max-w-lg px-10 py-12 mx-auto flex flex-col justify-center items-center gap-y-6 bg-white shadow-md rounded-lg border border-gray-200"
    >
      {loading && (
        <div>
          <Spinner />
        </div>
      )}
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        Reset Password
      </h2>

      <div className="w-full">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-600 mb-1"
        >
          Email
        </label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
        />
        <button
          type="submit"
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-md transition duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none"
        >
          Get Reset Link
        </button>
      </div>
    </form>
  );
};

export default EmailSent;
