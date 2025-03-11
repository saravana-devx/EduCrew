import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthAPI } from "../../../api/auth/AuthAPI";
import PasswordForm from "../authLayout/PasswordForm";
import axios from "axios";

const ResetForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token") || "";

  const navigate = useNavigate();

  const handleResetPassword = async (formData: {
    newPassword: string;
    confirmPassword: string;
  }) => {
    try {
      setLoading(true);
      await AuthAPI.resetForgetPassword(
        formData.newPassword,
        formData.confirmPassword,
        token
      );
      toast.success("Password reset successfully");
      navigate("/login");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const statusCode = error.response?.status;
        switch (statusCode) {
          case 401:
            toast.error("Failed to reset password");
            break;
          case 400:
            toast.error("Invalid Link");
            break;
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <PasswordForm
      mode="forgetPassword"
      onSubmit={handleResetPassword}
      loading={loading}
    />
  );
};

export default ResetForm;
