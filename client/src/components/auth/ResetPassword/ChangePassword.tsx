import React, { useState } from "react";
import { toast } from "react-toastify";
import { AuthAPI } from "../../../api/auth/AuthAPI";
import PasswordForm from "../Templates/PasswordForm";

const ChangePassword: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async (formData: {
    oldPassword?: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    setLoading(true);
    try {
      const result = await AuthAPI.changePassword(
        formData.oldPassword!,
        formData.newPassword,
        formData.confirmPassword
      );
      console.log(result);
      toast.success("Password changed successfully");
    } catch (error) {
      toast.error("Failed to change password");
      console.error(error);
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
