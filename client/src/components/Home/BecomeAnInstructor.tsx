import React from "react";
import { TiTick } from "react-icons/ti";
import instructor from "../../assets/Images/instructor0.png";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const BecomeAnInstructor: React.FC = () => {
  return (
    <div className="w-full max-h-fit flex bg-gradient-to-b lg:bg-gradient-to-r from-indigo-500 to-indigo-400">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row">
        <div className="lg:w-1/2 flex flex-col m-8 justify-center items-center">
          <h1 className="text-3xl lg:text-4xl font-bold mb-6 text-center lg:text-left text-white">
            Become an Instructor
          </h1>
          <p className="text-lg mb-6 text-center lg:text-left text-white">
            Join our vibrant community of instructors and connect with eager
            learners. At EduCrew, you can shape the future of education by
            sharing your expertise and insights.
          </p>
          <ul className="text-lg space-y-4">
            {[
              "Flexible Scheduling: Teach at your own pace, on your own terms",
              "Global Reach: Connect with students from around the world",
              "Competitive Compensation: Earn as you share your expertise",
              "Supportive Community: Collaborate with fellow educators and grow together",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center justify-start text-white"
              >
                <TiTick size={24} className="text-green-400 mr-3" />
                {item}
              </li>
            ))}
          </ul>
          <Link
            to="/signup"
            className="mt-8 w-44 inline-flex items-center justify-center px-6 py-3 bg-slate-800 text-white font-semibold rounded-full shadow-md hover:bg-slate-900 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1"
          >
            Apply Now
            <FaArrowRight className="ml-3 text-lg text-green-500" />
          </Link>
        </div>
        <div className="lg:w-1/2">
          <img
            src={instructor}
            alt="Smiling instructor"
            className="w-full h-[520px] md:h-[550px] lg:max-w-md object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default BecomeAnInstructor;
