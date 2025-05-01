import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaUser } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { BiSolidLogOut } from "react-icons/bi";

import { useAppDispatch, useAppSelector } from "../../../hooks/redux.hook";
import useClickOutside from "../../../hooks/useClickOutSlide";

import {
  getUserDetails,
  loggedInStatus,
  setLoggedIn,
  setUserDataNull,
} from "../../../redux/slices/userSlice";

import Sidebar from "./Sidebar";

const Navbar: React.FC = () => {
  const isLoggedIn = useAppSelector(loggedInStatus);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { image } = useAppSelector((state) => getUserDetails(state));

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const userDetails = useAppSelector(getUserDetails);
  let role: string = "";
  if (userDetails) {
    role = userDetails.accountType;
  }
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const profileDropdownRef = useRef(null);

  useClickOutside(profileDropdownRef, () => {
    setIsDropdownOpen(false);
  });

  const sideBarRef = useRef(null);

  useClickOutside(sideBarRef, () => {
    setIsSidebarOpen(false);
  });

  const handleLogOut = async () => {
    dispatch(setLoggedIn(false));
    dispatch(setUserDataNull());
    localStorage.removeItem("persist:user");
    localStorage.clear();
    navigate("/");
    dispatch({ type: "RESET" });
  };

  return (
    <div className="w-full py-2 md:py-4 px-6 shadow-md select-none">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <Link
          to="/"
          className="text-3xl font-bold text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
        >
         𝙴𝚍𝚞𝚌𝚛𝚎𝚠
        </Link>

        <div className="mx-8 hidden lg:flex gap-x-8 lg:items-center">
          {/* Navigation Links */}
          <nav>
            <ul className="flex justify-center gap-8 font-medium text-gray-700">
              <li>
                <Link
                  to="/"
                  className="hover:text-indigo-500 transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/courses"
                  className="hover:text-indigo-600 transition-colors duration-300"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-indigo-600 transition-colors duration-300"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-indigo-600 transition-colors duration-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          {/* Auth Buttons / Profile Image */}
          {!isLoggedIn ? (
            <Link
              to="/register-user"
              className="select-none flex justify-center items-center bg-indigo-600 text-white font-semibold px-6 py-2 rounded-full shadow-md transition-transform duration-300 ease-in-out hover:bg-slate-900 hover:scale-105"
            >
              Sign Up
              <span className="text-lg ml-2">
                <FaArrowRight />
              </span>
            </Link>
          ) : (
            <div className="relative" ref={profileDropdownRef}>
              <div onClick={toggleDropdown}>
                {image ? (
                  <img
                    src={
                      typeof image === "string"
                        ? image
                        : URL.createObjectURL(image)
                    }
                    className="hidden sm:block w-10 h-10 rounded-full object-cover border-2 border-indigo-600 shadow-md cursor-pointer hover:opacity-75 transition-opacity duration-300"
                    alt="Profile"
                  />
                ) : (
                  <FaUser className="text-indigo-400 rounded-full bg-slate-200 p-2 w-9 h-9 cursor-pointer" />
                )}
              </div>
              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute  right-0 w-48 mt-2 bg-white rounded-lg shadow-lg z-50">
                  <ul className="py-2">
                    <li className="flex justify-start px-4 items-center hover:bg-indigo-100">
                      <FaUser />
                      <Link
                        to="/profile"
                        className="w-full px-4 py-2 text-gray-700 "
                      >
                        Profile
                      </Link>
                    </li>
                    {role === "Student" && (
                      <li className="flex justify-start px-4 items-center hover:bg-indigo-100">
                        <MdDashboard />
                        <Link
                          to="/my-courses"
                          className="w-full px-4 py-2 text-gray-700 "
                        >
                          My Courses
                        </Link>
                      </li>
                    )}

                    {role === "Instructor" && (
                      <li className="flex justify-start px-4 items-center hover:bg-indigo-100">
                        <MdDashboard />
                        <Link
                          to="/instructor/dashboard"
                          className="w-full px-4 py-2 text-gray-700 "
                        >
                          Dashboard
                        </Link>
                      </li>
                    )}

                    {role === "Admin" && (
                      <li className="flex justify-start px-4 items-center hover:bg-indigo-100">
                        <MdDashboard />
                        <Link
                          to="/admin/dashboard"
                          className="w-full px-4 py-2 text-gray-700 "
                        >
                          Dashboard
                        </Link>
                      </li>
                    )}
                    {/* <li className="flex justify-start px-4 items-center hover:bg-indigo-100">
                      <IoMdSettings />
                      <Link
                        to="/settings"
                        className="w-full px-4 py-2 text-gray-700"
                      >
                        Settings
                      </Link>
                    </li> */}
                    {role === "Instructor" && (
                      <li className="flex justify-start px-4 items-center hover:bg-indigo-100">
                        <FaEdit />
                        <Link
                          to="/create-course"
                          className="w-full px-4 py-2 text-gray-700 "
                        >
                          create Course
                        </Link>
                      </li>
                    )}
                    <li className="flex justify-start px-4 items-center hover:bg-indigo-100">
                      <BiSolidLogOut />
                      <Link
                        to="/"
                        className="w-full px-4 py-2 text-gray-700 "
                        onClick={() => handleLogOut()}
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="block lg:hidden z-30">
          <RxHamburgerMenu
            className="w-8 h-8 text-indigo-600 cursor-pointer"
            onClick={toggleSidebar}
          />
        </div>
      </div>

      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        sideBarRef={sideBarRef}
        isLoggedIn={isLoggedIn}
        handleLogOut={handleLogOut}
        role={role}
      />
    </div>
  );
};

export default Navbar;
