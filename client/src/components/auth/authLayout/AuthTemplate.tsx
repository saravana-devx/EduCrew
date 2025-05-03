import React from "react";
import registerForm from "../../../assets/images/registerForm.png";
import { useAppSelector } from "../../../hooks/redux.hook";
import { getLoading } from "../../../redux/slices/userSlice";
import Spinner from "../../common/spinner/Spinner";

interface AuthProps {
  formData: {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    confirmPassword?: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleForgetPassword?: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleRoleChange?: (role: "Student" | "Instructor") => void;
  title: string;
  description: string;
  /**
   * TODO: Should i add optional(?) for role or not
   */
  role?: "Student" | "Instructor";
  buttonText: string;
  linkText: string;
  linkHref: string;
  isSignUp?: boolean;
}

const AuthTemplate: React.FC<AuthProps> = ({
  formData,
  handleChange,
  handleSubmit,
  handleRoleChange,
  handleForgetPassword,
  title,
  description,
  role,
  buttonText,
  linkText,
  linkHref,
  isSignUp,
}) => {
  const loading = useAppSelector(getLoading);
  return (
    <div
      className={`flex justify-center items-center p-4 lg:h-[820px] ${
        isSignUp ? "h-[920px]" : "h-[520px]"
      }`}
    >
      {loading && (
        <div>
          <Spinner />
        </div>
      )}
      <div className="flex flex-col md:flex-row max-w-4xl bg-white shadow-lg rounded-lg w-full">
        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
          <div className="flex flex-col justify-center items-center w-full">
            <h1 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 mb-4">
              {title}
            </h1>
            <p className="text-center text-gray-600 mb-8">{description}</p>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 gap-6 w-full"
            >
              {isSignUp && (
                <>
                  <div className="flex items-center">
                    <label className="mr-4 text-sm font-medium text-gray-700">
                      I am a:
                    </label>
                    <div className="flex items-center p-1 bg-gray-200 rounded-3xl">
                      <button
                        type="button"
                        className={`px-4 py-2 rounded-l-3xl focus:outline-none ${
                          role === "Student"
                            ? "bg-blue-600 text-white"
                            : "text-gray-700"
                        }`}
                        onClick={() =>
                          handleRoleChange && handleRoleChange("Student")
                        }
                      >
                        Student
                      </button>
                      <button
                        type="button"
                        className={`px-4 py-2 rounded-r-3xl focus:outline-none ${
                          role === "Instructor"
                            ? "bg-blue-600 text-white"
                            : "text-gray-700"
                        }`}
                        onClick={() =>
                          handleRoleChange && handleRoleChange("Instructor")
                        }
                      >
                        Instructor
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        First Name
                      </label>
                      <input
                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-300"
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First Name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Last Name
                      </label>
                      <input
                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-300"
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last Name"
                        required
                      />
                    </div>
                  </div>
                </>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-300"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-300"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                />
              </div>
              {isSignUp && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Confirm Password
                    </label>
                    <input
                      className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-300"
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm Password"
                      required
                    />
                  </div>
                </>
              )}

              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
              >
                {buttonText}
              </button>
            </form>
            <p className="mt-4 text-center text-gray-600">
              {linkText}{" "}
              <a href={linkHref} className="text-blue-600 hover:underline">
                {linkHref}
              </a>
              {!isSignUp && (
                <p
                  className="text-indigo-600 cursor-pointer select-none"
                  onClick={handleForgetPassword}
                >
                  Forget Password?
                </p>
              )}
            </p>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="hidden md:block md:w-1/2 bg-gradient-to-r from-blue-500 to-purple-500">
          <div className="flex items-center justify-center h-full">
            <img
              src={registerForm}
              alt="E-learning illustration"
              className="object-cover w-full h-full bg-zinc-200 grid place-items-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthTemplate;
