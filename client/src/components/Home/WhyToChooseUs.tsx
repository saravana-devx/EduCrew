import React from "react";
import { TiTick } from "react-icons/ti";
import image from "../../assets/Images/student.png";

const WhyToChooseUs: React.FC = () => {
  return (
    <div className="w-full max-h-fit flex bg-indigo-500 my-8 lg:my-12">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row">
        <div className="lg:w-1/2">
          <img
            src={image}
            alt="Smiling instructor"
            className="w-full h-[470px] lg:max-w-md object-contain"
          />
        </div>
        <div className="lg:w-1/2 flex flex-col m-8 justify-center items-center">
          <h1 className="text-3xl lg:text-4xl font-bold mb-6 text-center lg:text-left text-white">
            Why Choose EduCrew?
          </h1>
          <p className="text-lg mb-6 text-center lg:text-left text-white">
            Learn is your trusted partner in education, offering a wide
            range of courses and expert guidance to help you achieve your
            personal and professional goals. Our platform is designed to empower
            you with the skills and knowledge needed to succeed in today’s
            competitive world.
          </p>
          <ul className="text-lg space-y-4">
            {[
              "Expert Instructors with Industry Experience",
              "Comprehensive Courses Tailored to Your Needs",
              "Flexible Learning Options for Your Convenience",
              "Community Support to Keep You Motivated",
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
        </div>
      </div>
    </div>
  );
};

export default WhyToChooseUs;
