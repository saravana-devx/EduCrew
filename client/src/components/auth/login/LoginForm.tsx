import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/redux.hook";
import axios from "axios";
import { toast } from "react-toastify";

import { AuthAPI } from "../../../api/auth/AuthAPI";
import {
  setLoading,
  setLoggedIn,
  setToken,
  setUserData,
} from "../../../redux/slices/userSlice";

import AuthTemplate from "../authLayout/AuthTemplate";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleForgetPassword = () => {
    navigate("/forget-password");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await AuthAPI.login(formData.email, formData.password);
      console.log("result -> ", result);
      toast.success(result);
      dispatch(setToken(result.data.token));
      dispatch(setUserData(result.data.user));
      localStorage.setItem("token", result.data.token);
      dispatch(setLoggedIn(true));
      toast.success("Logged In");
      navigate("/");
    } catch (error) {
      console.log("error -> ", error);
      if (axios.isAxiosError(error)) {
        const { response } = error;
        if (response) {
          const statusCode = response.data?.status;
          switch (statusCode) {
            case 401:
              toast.warn("Unverified Account");
              break;
            case 404:
              toast.error("Email does not exist");
              navigate("/signUp");
              toast.success("Create a new account");
              break;
            case 409:
              toast.error("Incorrect password");
              break;
            default:
              toast.error("Login failed. Please check your credentials.");
          }
        }
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <AuthTemplate
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleForgetPassword={handleForgetPassword}
      title="Login to Your Account"
      description="Access your courses and more."
      buttonText="Log In"
      linkText="Don't have an account?"
      linkHref="signUp"
      isSignUp={false}
    />
  );
};

export default Login;
