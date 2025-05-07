import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import { FaEdit, FaSignInAlt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { BiSolidLogOut } from "react-icons/bi";
import {
  FaHome,
  FaBook,
  FaInfoCircle,
  FaEnvelope,
  FaUser,
} from "react-icons/fa";

const Sidebar: React.FC<{
  isOpen: boolean;
  sideBarRef: React.RefObject<HTMLElement>;
  isLoggedIn: boolean;
  role: string;
  handleLogOut: () => void;
}> = ({ isOpen, sideBarRef, isLoggedIn, role, handleLogOut }) => {
  return (
    <div
      className={`fixed top-0 left-0 w-44 z-20 h-screen bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:hidden`}
    >
      <div className="p-4">
        <h2 className="text-2xl font-bold text-indigo-600">𝙴𝚍𝚞𝚌𝚛𝚎𝚠</h2>
        <nav className="mt-6" ref={sideBarRef}>
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className="flex items-center p-2 text-gray-700 hover:bg-indigo-100 rounded-lg"
              >
                <FaHome className="mr-2" /> Home
              </Link>
            </li>
            <li>
              <Link
                to="/courses"
                className="flex items-center p-2 text-gray-700 hover:bg-indigo-100 rounded-lg"
              >
                <FaBook className="mr-2" /> Courses
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="flex items-center p-2 text-gray-700 hover:bg-indigo-100 rounded-lg"
              >
                <FaInfoCircle className="mr-2" /> About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="flex items-center p-2 text-gray-700 hover:bg-indigo-100 rounded-lg"
              >
                <FaEnvelope className="mr-2" /> Contact
              </Link>
            </li>
            {!isLoggedIn && (
              <li>
                <Link
                  to="/register-user"
                  className="flex items-center p-2 text-gray-700 hover:bg-indigo-100 rounded-lg"
                >
                  {" "}
                  <FaSignInAlt className="mr-2" /> Sign Up
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <Fragment>
                <li>
                  <Link
                    to="/profile"
                    className="flex items-center p-2 text-gray-700 hover:bg-indigo-100 rounded-lg"
                  >
                    <FaUser className="mr-2" /> Profile
                  </Link>
                </li>
                {role === "Instructor" && (
                  <li>
                    <Link
                      to="/create-course"
                      className="flex items-center p-2 text-gray-700 hover:bg-indigo-100 rounded-lg"
                    >
                      <FaEdit className="mr-2" /> Create Course
                    </Link>
                  </li>
                )}

                {role === "Instructor" && (
                  <li>
                    <Link
                      to="/instructor/dashboard"
                      className="flex items-center p-2 text-gray-700 hover:bg-indigo-100 rounded-lg"
                    >
                      <MdDashboard className="mr-2" /> Dashboard
                    </Link>
                  </li>
                )}

                {role === "Admin" && (
                  <li>
                    <Link
                      to="/admin/dashboard"
                      className="flex items-center p-2 text-gray-700 hover:bg-indigo-100 rounded-lg"
                    >
                      <MdDashboard className="mr-2" /> Dashboard
                    </Link>
                  </li>
                )}
                {role === "Student" && (
                  <li>
                    <Link
                      to="/my-courses"
                      className="flex items-center p-2 text-gray-700 hover:bg-indigo-100 rounded-lg"
                    >
                      <MdDashboard className="mr-2" /> My Courses
                    </Link>
                  </li>
                )}

                <li>
                  <button
                    onClick={handleLogOut}
                    className="flex items-center p-2 text-gray-700 hover:bg-indigo-100 rounded-lg"
                  >
                    <BiSolidLogOut className="mr-2 " /> Logout
                  </button>
                </li>
              </Fragment>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
