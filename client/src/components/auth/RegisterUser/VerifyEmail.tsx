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

const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const verifyToken = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    console.log("token -> ", token);

    AuthAPI.ConfirmEmail(token)
      .then((result) => {
        toast.success("Account Verified");
        console.log(result);
        dispatch(setLoggedIn(true));
        dispatch(setToken(token || ""));
        localStorage.setItem("token", token || "");
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.status === 400
        ) {
          toast.warn("Invalid or Expired token");
        } else if (error.response.data && error.response.data.status === 400) {
          toast.warn("Email doesn't exist");
        }
      });

    if (token) {
      ProfileAPI.profileDetails().then((result) => {
        dispatch(setUserData(result.data.user));
        navigate("/");
      });
    }
  };

  return (
    <div className="h-[420px] flex items-center justify-center">
      <div className="max-w-xl w-full h-80 px-6 py-8 flex items-center justify-center flex-col gap-6 bg-white shadow-xl rounded-lg">
        <h1 className="text-slate-900 text-2xl font-bold text-center">
          Click Below Button to Verify Account.
        </h1>
        <button
          onClick={verifyToken}
          className="w-40 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition ease-in-out duration-200"
        >
          Verify Account
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;
