import React from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/redux.hook";
import { AuthAPI } from "../../../api/auth/AuthAPI";
import { ProfileAPI } from "../../../api/auth/ProfileAPI";
import {
  setLoggedIn,
  setToken,
  setUserData,
} from "../../../redux/slices/userSlice";
import axios from "axios";

const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const verifyEmail = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    try {
      if (token) {
        dispatch(setLoggedIn(true));

        // Confirm email with the token
        await AuthAPI.ConfirmEmail(token);
        toast.success("Account Verified");

        // Store token in the state and localStorage
        dispatch(setToken(token));
        localStorage.setItem("token", token);
        const profileResult = await ProfileAPI.profileDetails();
        dispatch(setUserData(profileResult.data.user));
        navigate("/");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const statusCode = error.response?.status;
        if (statusCode === 400) {
          toast.warn("Invalid or Expired token");
        } else if (statusCode === 404) {
          toast.warn("Email doesn't exist");
          navigate("/register-user");
        }
      }
    } finally {
      dispatch(setLoggedIn(false));
    }
  };

  return (
    <div className="h-[420px] flex items-center justify-center">
      <div className="max-w-xl w-full h-80 px-6 py-8 flex items-center justify-center flex-col gap-6 bg-white shadow-xl rounded-lg">
        <h1 className="text-slate-900 text-2xl font-bold text-center">
          Click Below Button to Verify Account.
        </h1>
        <button
          onClick={verifyEmail}
          className="w-40 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition ease-in-out duration-200"
        >
          Verify Account
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;
