import React from "react";

interface CourseProps {
  title: string;
  noOfCourses: number;
  image: string;
}

const Course: React.FC<CourseProps> = ({ title, noOfCourses, image }) => {
  return (
    <div className="flex flex-col lg:flex-row justify-center items-center bg-indigo-50 p-3 sm:p-4 lg:p-6 border border-indigo-200 rounded-lg shadow-lg transform hover:-translate-y-1 hover:shadow-2xl transition-transform duration-300 ease-in-out w-full max-w-[360px] sm:max-w-[480px] lg:max-w-[600px] mx-auto">
      <div className="mb-4 lg:mb-0 lg:w-1/3 flex justify-center items-center">
        <img src={image} className="w-12 h-12 sm:w-14 sm:h-14" alt={title} />
      </div>
      <div className="text-center lg:w-2/3 lg:text-left">
        <h2 className="text-lg sm:text-xl font-semibold text-indigo-800 mb-1 sm:mb-2">
          {title}
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          {noOfCourses}+ Courses
        </p>
      </div>
    </div>
  );
};

import financeImage from "../../assets/images/category/finance.png";
import technologyImage from "../../assets/images/category/technology.png";
import businessImage from "../../assets/images/category/business.png";
import designImage from "../../assets/images/category/design.png";
import personalDev from "../../assets/images/category/personal-development.png";
import marketingImage from "../../assets/images/category/marketing.png";

const CourseCategories = () => {
  const categories = [
    {
      title: "Personal Development",
      noOfCourses: 1240,
      image: personalDev,
    },
    {
      title: "Technology",
      noOfCourses: 2000,
      image: technologyImage,
    },
    {
      title: "Business",
      noOfCourses: 1500,
      image: businessImage,
    },
    {
      title: "Marketing",
      noOfCourses: 900,
      image: marketingImage,
    },
    {
      title: "Finance",
      noOfCourses: 700,
      image: financeImage,
    },
    {
      title: "Design",
      noOfCourses: 1000,
      image: designImage,
    },
  ];

  return (
    <div className="w-full sm:w-11/12 lg:w-10/12 xl:w-8/12 mx-auto mt-8 text-center px-4">
      <p className="text-lg sm:text-xl font-semibold">
        Elevate Your Tech Skills
      </p>
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
        Explore 40,000+ Online Courses
      </h1>
      <p className="text-sm sm:text-base lg:text-lg mb-6">
        Unlock your potential and advance your career with our specialized
        courses.
      </p>

      <div className="w-full xl:w-10/12 mx-auto grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
        {categories.map((category, index) => (
          <Course
            key={index}
            title={category.title}
            noOfCourses={category.noOfCourses}
            image={category.image} // Passing the correct image prop
          />
        ))}
      </div>
    </div>
  );
};

export default CourseCategories;
