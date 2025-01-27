import React from "react";

const TrustedSection: React.FC = () => {
  return (
    <div className="w-full my-8 py-10  rounded-lg ">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">
          Trusted by Thousands
        </h2>
        <p className="w-11/12 lg:w-2/3 mx-auto text-xl text-center mb-4">
          Trusted Over <span className="font-bold">13,400</span> students &
          organizations
        </p>
        <p className="w-full lg:w-2/3 mx-auto text-xl text-center mb-6">
          Recommended Around the World
        </p>
      </div>
    </div>
  );
};

export default TrustedSection;
