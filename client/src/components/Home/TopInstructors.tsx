import React, { Fragment } from "react";
import instructor1 from "../../assets/Images/instructor2.png";
import instructor from "../../assets/Images/instructor3.png";

import instructor2 from "./instructor2.png";
import instructor4 from "./instructor4.jpg";

const TopInstructors: React.FC = () => {
  const instructorDetails = [
    { name: "Margot Robbie", image: instructor },
    { name: "John Doe", image: instructor2 },
    { name: "Marlene Favela", image: instructor1 },
    { name: "Kenny Johnson", image: instructor4 },
  ];

  return (
    <div className="w-full md:w-4xl lg:max-w-5xl mx-auto grid place-items-center grid-cols-2 md:grid-cols-4 gap-4">
      {instructorDetails.map((instructor, index) => (
        <Fragment key={index}>
          <div className="w-48 md:w-full flex flex-col gap-x-4 md:gap-x-0 items-center">
            <div className="z-10 w-full p-4 flex flex-col items-center shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 bg-white">
              <img
                className="w-36 h-48 md:w-36 md:h-48 lg:w-64 lg:h-72 rounded-full mb-4"
                src={instructor.image}
                alt={instructor.name}
              />
              <p className="text-base md:text-lg font-semibold text-center text-gray-800">
                {instructor.name}
              </p>
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  );
};

export default TopInstructors;
