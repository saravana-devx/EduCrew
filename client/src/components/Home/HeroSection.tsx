import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import heroSectionImage from "../../assets/images/heroSectionImage.png";

const HeroSection: React.FC = () => {
  return (
    <div className="w-full h-auto md:h-[580px] flex flex-col md:flex-row bg-gradient-to-r from-indigo-100 to-blue-200">
      {/* Left Side: Text Section */}
      <div className="w-full animate-slideInLeft mx-auto md:w-1/2 2xl:w-2/6 flex flex-col justify-center items-center md:items-start text-center md:text-left md:mr-14  xl:mr-28 text-slate-800 p-4 md:p-8 ">
        <p className="text-lg  font-medium">100% QUALITY COURSES</p>
        <h1 className="text-3xl md:text-4xl mt-6 md:mt-4 font-bold w-10/12 md:w-full leading-tight">
          Find Your{" "}
          <div className="relative inline-block">
            <span className="relative">Perfect</span>
            <span className="absolute left-0 bottom-0 -rotate-3 bg-yellow-400 w-20 md:w-28 h-[2px]"></span>
            <span className="absolute left-0 -bottom-1 -rotate-6 bg-yellow-400 w-20 md:w-28 h-[2px]"></span>
          </div>{" "}
          Courses And Improve Your
          <div className="relative inline-block">
            <span className="relative z-10 font-bold text-3xl md:text-4xl">
              &nbsp; Skills
            </span>
            <span className="absolute md:w-28 h-10 inset-1 bg-yellow-400 clip-zigzag"></span>
          </div>
        </h1>
        <p className="text-sm md:text-lg my-4 md:my-6 font-medium text-slate-500 mt-4">
          We Have <span className="font-bold">40k+</span> Online Courses &{" "}
          <span className="font-bold">500k+</span> Online Registered Students.
        </p>
        <Link
          to="/courses"
          className="select-none font-semibold text-white flex items-center justify-center gap-x-2 border-2 border-gray-200 px-5 py-2.5 bg-indigo-500 rounded-full shadow-sm transition-transform duration-300 ease-in-out hover:bg-slate-900 hover:shadow-lg hover:translate-y-[-2px] text-center"
        >
          Explore All Courses
          <span className="text-lg">
            <FaArrowRight />
          </span>
        </Link>
      </div>

      {/* Right Side: Image Section */}
      <div className="w-full animate-slideInOut md:w-1/2 flex justify-center items-center md:items-end mt-6 md:mt-0">
        <img
          src={heroSectionImage}
          alt=""
          className="w-[250px] md:w-[400px] h-[350px] md:h-[550px] object-cover"
        />
      </div>
    </div>
  );
};

export default HeroSection;
