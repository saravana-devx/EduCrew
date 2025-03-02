import React, { useState } from "react";
import { toast } from "react-toastify";
import { AuthAPI } from "../../../api/auth/AuthAPI";
import PasswordForm from "../authLayout/PasswordForm";
import axios from "axios";

const ChangePassword: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async (formData: {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    try {
      // Check if the new password and confirm password match
      if (formData.newPassword !== formData.confirmPassword) {
        toast.warn("New password and confirm password do not match");
        return;
      }

      setLoading(true);
      await AuthAPI.changePassword(
        formData.oldPassword,
        formData.newPassword,
        formData.confirmPassword
      );
      toast.success("Password changed successfully");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const statusCode = error.response?.status;
        switch (statusCode) {
          case 401:
            toast.warn("Old password does not match");
            break;
          case 400:
            toast.warn("Password must be different from the previous one");
            break;
        }
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <PasswordForm
      mode="changePassword"
      onSubmit={handleChangePassword}
      loading={loading}
    />
  );
};

export default ChangePassword;
