import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaGithub, FaTwitter } from "react-icons/fa";

import svg from "../../../assets/images/footerBottomWave.svg";

const Footer: React.FC = () => {
  return (
    <div className="mt-8">
      <div>
        <img src={svg} alt="Pattern" />
      </div>
      <footer className=" bg-indigo-500 py-8 sm:py-12 -mt-2 text-white">
        <div className="container mx-auto px-4">
          <div className="sm:flex sm:flex-wrap sm:-mx-4 md:py-4">
            <div className="px-4 sm:w-1/2 md:w-1/4 xl:w-1/6">
              <h5 className="text-xl font-bold mb-6">Courses</h5>
              <ul className="list-none footer-links">
                <li className="mb-2">
                  <Link
                    to="#"
                    className="border-b border-solid border-transparent hover:border-white hover:text-white"
                  >
                    Popular Courses
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="#"
                    className="border-b border-solid border-transparent hover:border-white hover:text-white"
                  >
                    New Arrivals
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="#"
                    className="border-b border-solid border-transparent hover:border-white hover:text-white"
                  >
                    Categories
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="#"
                    className="border-b border-solid border-transparent hover:border-white hover:text-white"
                  >
                    Instructors
                  </Link>
                </li>
              </ul>
            </div>
            <div className="px-4 sm:w-1/2 md:w-1/4 xl:w-1/6 mt-8 sm:mt-0">
              <h5 className="text-xl font-bold mb-6">Resources</h5>
              <ul className="list-none footer-links">
                <li className="mb-2">
                  <Link
                    to="#"
                    className="border-b border-solid border-transparent hover:border-white hover:text-white"
                  >
                    Blog
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="#"
                    className="border-b border-solid border-transparent hover:border-white hover:text-white"
                  >
                    Webinars
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="#"
                    className="border-b border-solid border-transparent hover:border-white hover:text-white"
                  >
                    eBooks
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="#"
                    className="border-b border-solid border-transparent hover:border-white hover:text-white"
                  >
                    Case Studies
                  </Link>
                </li>
              </ul>
            </div>
            <div className="px-4 sm:w-1/2 md:w-1/4 xl:w-1/6 mt-8 md:mt-0">
              <h5 className="text-xl font-bold mb-6">About Us</h5>
              <ul className="list-none footer-links">
                <li className="mb-2">
                  <Link
                    to="#"
                    className="border-b border-solid border-transparent hover:border-white hover:text-white"
                  >
                    Our Mission
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="#"
                    className="border-b border-solid border-transparent hover:border-white hover:text-white"
                  >
                    Team
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="#"
                    className="border-b border-solid border-transparent hover:border-white hover:text-white"
                  >
                    Careers
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="#"
                    className="border-b border-solid border-transparent hover:border-white hover:text-white"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div className="px-4 sm:w-1/2 md:w-1/4 xl:w-1/6 mt-8 md:mt-0">
              <h5 className="text-xl font-bold mb-6">Help & Support</h5>
              <ul className="list-none footer-links">
                <li className="mb-2">
                  <Link
                    to="#"
                    className="border-b border-solid border-transparent hover:border-white hover:text-white"
                  >
                    FAQs
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="#"
                    className="border-b border-solid border-transparent hover:border-white hover:text-white"
                  >
                    Support Center
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="#"
                    className="border-b border-solid border-transparent hover:border-white hover:text-white"
                  >
                    Feedback
                  </Link>
                </li>
              </ul>
            </div>
            <div className="px-4 mt-4 sm:w-1/3 xl:w-1/6 sm:mx-auto xl:mt-0 xl:ml-auto">
              <h5 className="text-xl font-bold mb-6 sm:text-center xl:text-left">
                Stay Connected
              </h5>
              <div className="flex sm:justify-center xl:justify-start">
                <Link
                  to="#"
                  className="w-10 h-10 flex justify-center items-center  border-2 border-gray-300 rounded-full text-center py-1 text-gray-100 hover:text-indigo-500 hover:bg-white hover:border-white transition-all duration-300 ease-in-out transform hover:-translate-y-1"
                >
                  <FaFacebookF className="text-2xl" />
                </Link>
                <Link
                  to="#"
                  className="w-10 h-10 flex justify-center items-center  border-2 border-gray-300 rounded-full text-center py-1 ml-2 text-gray-100 hover:text-indigo-500 hover:bg-white hover:border-white transition-all duration-300 ease-in-out transform hover:-translate-y-1"
                >
                  <FaTwitter className="text-2xl" />
                </Link>
                <Link
                  to="#"
                  className="w-10 h-10 flex justify-center items-center  border-2 border-gray-300 rounded-full text-center py-1 ml-2 text-gray-100 hover:text-indigo-500 hover:bg-white hover:border-white transition-all duration-300 ease-in-out transform hover:-translate-y-1"
                >
                  <FaGithub className="text-2xl" />
                </Link>
              </div>
            </div>
          </div>

          <div className="sm:flex sm:flex-wrap sm:-mx-4 mt-6 pt-6 sm:mt-12 sm:pt-12 border-t border-gray-400">
            <div className="sm:w-full px-4 md:w-1/6">
              <strong className="text-lg sm:text-3xl md:text-4xl ">
                𝔩𝔢𝔞𝔯𝔫𝔰𝔭𝔥𝔢𝔯𝔢
              </strong>
            </div>
            <div className="px-4 sm:w-1/2 md:w-1/4 mt-4 md:mt-0">
              <h6 className="font-bold mb-2">Address</h6>
              <address className="not-italic mb-4 text-sm">
                348 Logan Boulevard, chicago , US
              </address>
            </div>
            <div className="px-4 sm:w-1/2 md:w-1/4 mt-4 md:mt-0">
              <h6 className="font-bold mb-2">Free Resources</h6>
              <p className="mb-4 text-sm">
                Access free learning materials and resources to get started.
                <em>
                  All resources are available under a Creative Commons License
                </em>
              </p>
            </div>
            <div className="px-4 md:w-1/4 md:ml-auto mt-6 sm:mt-4 md:mt-0">
              <button className="mt-8 inline-flex items-center justify-center px-6 py-3 bg-slate-800 text-white font-semibold rounded-full shadow-md hover:bg-slate-900 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
