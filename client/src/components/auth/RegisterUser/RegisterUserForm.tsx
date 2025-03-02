import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

import { useAppDispatch } from "../../../hooks/redux.hook";
import { AuthAPI } from "../../../api/auth/AuthAPI";

import AuthTemplate from "../authLayout/AuthTemplate";
import { setLoading } from "../../../redux/slices/userSlice";
import axios from "axios";

const RegisterUserForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [role, setRole] = useState<"Student" | "Instructor">("Student"); // Default role is 'student'

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoleChange = (newRole: "Student" | "Instructor") => {
    setRole(newRole);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("passwords do not match");
      return;
    }

    const userData = {
      firstName: formData.firstName || "",
      lastName: formData.lastName || "",
      email: formData.email,
      password: formData.password,
      accountType: role,
    };
    // dispatch(setLoading(true));
    // await AuthAPI.registerUser(userData)
    //   .then((result) => {
    //     toast.success("Check Your email to verify account");
    //     console.log(result);
    //     userData.password = "";
    //     navigate("/open-gmail");
    //     dispatch(setLoading(false));
    //   })
    //   .catch((error) => {
    //     if (error.response.status === 409) {
    //       toast.error("email already exists");
    //       dispatch(setLoading(false));
    //       navigate("/login");
    //     } else {
    //       navigate("/");
    //     }
    //   });
    try {
      dispatch(setLoading(true));
      await AuthAPI.registerUser(userData);
      toast.success("Check your email to verify your account!");
      userData.password = "";
      navigate("/open-gmail");
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        toast.error("Email already exists. Please log in.");
        navigate("/login");
      } else {
        navigate("/");
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <AuthTemplate
      formData={formData}
      role={role}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleRoleChange={handleRoleChange}
      title="Create an Account"
      description="Join us and start learning today."
      buttonText="Sign Up"
      linkText="Already have an account?"
      linkHref="login"
      isSignUp={true}
    ></AuthTemplate>
  );
};

export default RegisterUserForm;
