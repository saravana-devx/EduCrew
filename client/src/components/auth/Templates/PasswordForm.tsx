import React, { useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../../common/spinner/Spinner";

interface PasswordFormProps {
  mode: "changePassword" | "forgetPassword";
  onSubmit: (formData: {
    oldPassword?: string;
    newPassword: string;
    confirmPassword: string;
  }) => Promise<void>;
  loading: boolean;
}

const PasswordForm: React.FC<PasswordFormProps> = ({
  mode,
  onSubmit,
  loading,
}) => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }
    try {
      await onSubmit(formData);
      setFormData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {loading && <Spinner />}
      <form
        onSubmit={handleSubmit}
        className="mt-16 mb-16 max-w-lg px-10 py-12 mx-auto flex flex-col justify-center items-center gap-y-6 bg-white shadow-md rounded-lg border border-gray-200"
      >
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          {mode === "changePassword" ? "Change Password" : "Reset Password"}
        </h2>

        {mode === "changePassword" && (
          <div className="w-full">
            <label
              htmlFor="oldPassword"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Old Password
            </label>
            <input
              type="password"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleOnChange}
              placeholder="Enter old password"
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>
        )}

        <div className="w-full">
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleOnChange}
            placeholder="Enter new password"
            className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            required
          />
        </div>

        <div className="w-full">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Confirm New Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleOnChange}
            placeholder="Confirm new password"
            className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-md transition duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none"
        >
          {mode === "changePassword" ? "Change Password" : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default PasswordForm;
