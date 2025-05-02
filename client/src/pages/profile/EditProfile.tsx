import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { ProfileAPI } from "../../api/auth/ProfileAPI";
import { useAppSelector } from "../../hooks/redux.hook";

import { getUserDetails, setUserData } from "../../redux/slices/userSlice";
import { UserDetails } from "../../utils/types";
import { MdEdit } from "react-icons/md";

const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useAppSelector((state) =>
    getUserDetails(state)
  ) as UserDetails;
  const [userDetails, setUserDetails] = useState({
    firstName: userData.firstName || "",
    lastName: userData.lastName || "",
    email: userData.email || "",
    accountType: userData.accountType,
    image: userData.image || "",
    additionalDetails: {
      gender: userData.additionalDetails?.gender || "",
      dob: userData.additionalDetails?.dob,
      about: userData.additionalDetails?.about || "",
      contactNumber: userData.additionalDetails?.contactNumber || "",
    },
  });

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUserDetails((prevData) => ({
        ...prevData,
        image: file,
      }));
    }
  };

  // Common change handler
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    field: keyof UserDetails | "additionalDetails"
  ) => {
    const { name, value } = e.target;

    if (field === "additionalDetails") {
      setUserDetails((prevData) => ({
        ...prevData,
        additionalDetails: {
          ...prevData.additionalDetails,
          [name]: name === "dob" ? new Date(value) : value, // Update DOB correctly
        },
      }));
    } else {
      setUserDetails((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    }
  };

  const validateDateOfBirth = (dob: string): boolean => {
    const today = new Date();
    const selectedDate = new Date(dob);
    const minAge = 18; // Set minimum age requirement if applicable
    const isValid =
      selectedDate < today &&
      today.getFullYear() - selectedDate.getFullYear() >= minAge;

    if (!isValid) {
      // toast.error("Provide a Valid Birth Date");
      return false;
    }

    return true; // No error if valid
  };

  const validateContactNumber = (contactNumber: string): boolean => {
    const regex = /^(0|91)?[6-9][0-9]{9}$/;

    return regex.test(contactNumber);
  };

  const validateUserDetails = () => {
    const { additionalDetails } = userDetails;
    if (
      !additionalDetails.contactNumber ||
      !validateContactNumber(additionalDetails.contactNumber)
    ) {
      return "Please provide a valid contact number";
    }

    if (!additionalDetails.dob || !validateDateOfBirth(additionalDetails.dob)) {
      return "Please provide a valid DOB";
    }
  };
  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const validationError = validateUserDetails();
      if (validationError) {
        return toast.warn(validationError);
      }

      if (!userDetails.image) return toast.warn("Provide an image");

      const formData = new FormData();
      // Append user details to FormData
      formData.append("firstName", userDetails.firstName);
      formData.append("lastName", userDetails.lastName);
      formData.append("gender", userDetails.additionalDetails.gender || "");
      const dob = userDetails.additionalDetails.dob
        ? new Date(userDetails.additionalDetails.dob)
        : null;

      formData.append("dob", dob ? dob.toISOString() : "");
      formData.append("about", userDetails.additionalDetails.about || "");
      formData.append(
        "contactNumber",
        userDetails.additionalDetails.contactNumber?.toString() || ""
      );

      if (userDetails.image) {
        formData.append("image", userDetails.image);
      }

      const result = await ProfileAPI.updateProfile(formData);
      dispatch(setUserData(result.data.updatedProfile));
      toast.success("Profile updated successfully!");
      navigate("/profile");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.status === 400
        ) {
          toast.warn("Please provide details to update");
        }
      }
    }
  };

  return (
    <form onSubmit={handleOnSubmit} className="w-full h-full">
      <div className="w-11/12 lg:w-1/2 mx-auto mt-8">
        <div className="flex justify-center items-center gap-x-8">
          <div className="relative w-44 h-44 bg-slate-900 rounded-full overflow-hidden">
            {userDetails.image ? (
              <img
                src={
                  typeof userDetails.image === "string"
                    ? userDetails.image
                    : URL.createObjectURL(userDetails.image)
                }
                className="object-cover w-44 h-44 transition-transform duration-300 hover:scale-105 z-10"
                alt="Profile Image Preview"
              />
            ) : (
              <div className="flex items-center justify-center w-44 h-44 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-500 text-sm md:text-base font-medium z-10">
                Select An Image
              </div>
            )}
            <input
              type="file"
              id="thumbnail"
              accept="image/*"
              onChange={handleThumbnailChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
            />
            {/* Edit Button */}
            <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md flex items-center justify-center hover:bg-gray-100 group">
              <MdEdit className="w-6 h-6" />
              {/* Hovered Text */}
              <span className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs font-medium px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Change Image
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              type="text"
              name="firstName"
              value={userDetails.firstName}
              placeholder="First Name"
              required
              onChange={(e) => handleInputChange(e, "firstName")}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              type="text"
              name="lastName"
              value={userDetails.lastName}
              placeholder="Last Name"
              required
              onChange={(e) => handleInputChange(e, "lastName")}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <select
              className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              name="gender"
              value={userDetails.additionalDetails.gender}
              onChange={(e) => handleInputChange(e, "additionalDetails")}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              type="date"
              name="dob"
              value={
                userDetails.additionalDetails?.dob
                  ? new Date(userDetails.additionalDetails.dob)
                      .toISOString()
                      .split("T")[0]
                  : ""
              }
              onChange={(e) => {
                handleInputChange(e, "additionalDetails");
                validateDateOfBirth(e.target.value);
              }}
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              About
            </label>
            <textarea
              className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              name="about"
              maxLength={100}
              minLength={40}
              placeholder="Tell us about yourself"
              value={userDetails.additionalDetails.about}
              onChange={(e) => handleInputChange(e, "additionalDetails")}
              rows={4}
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              type="email"
              name="email"
              placeholder="Email"
              value={userDetails.email}
              required
              onChange={(e) => handleInputChange(e, "email")}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              type="text"
              name="contactNumber"
              placeholder="Phone Number"
              value={userDetails.additionalDetails.contactNumber}
              required
              onChange={(e) => handleInputChange(e, "additionalDetails")}
            />
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all"
            type="submit"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditProfile;
