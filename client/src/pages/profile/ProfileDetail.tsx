import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEdit, FaUser } from "react-icons/fa";

import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";

import { ProfileAPI } from "../../api/auth/ProfileAPI";
import { SomethingWentWrong } from "../../components/common/error/SomethingWentWrong";

import {
  getUserDetails,
  setLoading,
  setUserData,
  setUserDataNull,
} from "../../redux/slices/userSlice";

const ProfileDetail: React.FC = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(getUserDetails);

  useEffect(() => {
    const fetchUserDetails = async () => {
      dispatch(setLoading(true));

      await ProfileAPI.profileDetails().then((result) => {
        dispatch(setUserData(result.data.userDetails));
        dispatch(setLoading(false));
      });
      dispatch(setLoading(false));
    };

    fetchUserDetails();
  }, [dispatch]);

  const handleDeleteAccount = async () => {
    await ProfileAPI.deleteAccount().then((result) => {
      console.log(result.data);
      dispatch(setUserDataNull());
      dispatch({ type: "RESET" });
      localStorage.clear();
      toast.success("Account Deleted Successfully");
    });
  };

  return (
    <>
      {userData ? (
        <div className="text-slate-900 mt-2">
          <div className="w-full mt-8 flex flex-col justify-center px-4 md:px-0 md:w-5/12 mx-auto">
            <div className="text-3xl font-bold text-left text-indigo-500">
              Welcome, {userData.firstName}!
            </div>
            <p className="mt-2 text-lg text-gray-600 text-left">
              We're excited to have you here! Explore our wide range of courses
              designed to enhance your skills and knowledge in computer science.
            </p>
            <div className="mt-4 flex justify-end w-full">
              <Link
                to="/edit-profile"
                className="flex items-center gap-x-2 bg-indigo-600 text-white font-semibold px-6 py-2 rounded-full shadow-md transition-transform duration-300 ease-in-out hover:bg-indigo-700 hover:scale-105"
              >
                Edit Profile
                <FaUser />
              </Link>
            </div>
          </div>

          <div className="w-full md:w-4/6 lg:w-3/5 xl:w-2/5 mx-auto px-4 md:px-0 mt-8">
            {/* Profile Picture and Name */}
            <div className="flex flex-col items-center mt-8">
              {userData.image && typeof userData.image === "string" ? (
                <img
                  src={userData.image}
                  className="bg-slate-900 w-32 h-32 md:w-44 md:h-44 object-cover rounded-full border-2 border-indigo-500"
                  alt="Profile"
                />
              ) : userData.image && typeof userData.image !== "string" ? (
                <img
                  src={URL.createObjectURL(userData.image)}
                  className="bg-slate-900 w-32 h-32 md:w-44 md:h-44 object-cover rounded-full border-2 border-indigo-500"
                  alt="Profile"
                />
              ) : (
                <FaEdit />
              )}

              <p className="text-2xl md:text-3xl font-semibold mt-4">
                {userData.firstName} {userData.lastName}
              </p>
              <p className="w-full md:w-3/4 my-4 text-gray-500 text-center">
                {userData.additionalDetails?.about ||
                  "No additional information provided."}
              </p>
            </div>

            {/* User Information */}
            <div className="mt-8 flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2">
                <p className="text-gray-700 font-medium">Email</p>
                <p className="mt-2 border-2 px-4 py-2 rounded-2xl border-indigo-300 break-words">
                  {userData.email}
                </p>
              </div>
              <div className="w-full md:w-1/2">
                <p className="text-gray-700 font-medium">Phone Number</p>
                <p className="mt-2 border-2 px-4 py-2 rounded-2xl border-indigo-300 break-words">
                  {userData.additionalDetails?.contactNumber || "Not available"}
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2">
                <p className="text-gray-700 font-medium">Gender</p>
                <p className="mt-2 border-2 px-4 py-2 rounded-2xl border-indigo-300">
                  {userData.additionalDetails?.gender || "Not available"}
                </p>
              </div>
              <div className="w-full md:w-1/2">
                <p className="text-gray-700 font-medium">Date of Birth</p>
                <p className="mt-2 border-2 px-4 py-2 rounded-2xl border-indigo-300">
                  {userData.additionalDetails?.dob
                    ? new Date(userData.additionalDetails.dob).toDateString()
                    : "DOB not available"}
                </p>
              </div>
            </div>

            {/* Password Section */}
            <div className="mt-8 flex flex-col">
              <p className="text-gray-700 font-medium">Password</p>
              <div className="flex flex-col md:flex-row items-center mt-2 gap-4">
                <p className="w-full md:w-2/3 text-center border-2 px-4 py-2 rounded-2xl border-indigo-300">
                  **********
                </p>
                <Link
                  to="/change-password"
                  className="flex items-center gap-x-2 bg-slate-900 text-white font-semibold px-6 py-2 rounded-full shadow-sm transition-transform duration-300 ease-in-out hover:bg-indigo-700 hover:shadow-lg"
                >
                  Change Password
                  <FaEdit />
                </Link>
              </div>
            </div>
            <div className="mt-12 flex flex-col items-center">
              <button
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to delete your account? This action cannot be undone."
                    )
                  ) {
                    handleDeleteAccount();
                  }
                }}
                className="bg-red-600 text-white font-semibold px-6 py-2 rounded-full shadow-md transition-transform duration-300 ease-in-out hover:bg-red-700 hover:scale-105"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      ) : (
        <SomethingWentWrong />
      )}
    </>
  );
};

export default ProfileDetail;
