import React from "react";

const LoadingCard: React.FC = () => {
  return (
    <div className="flex flex-wrap justify-center gap-6 mt-8">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="w-72 bg-gray-200 animate-pulse shadow-lg rounded-lg overflow-hidden"
        >
          <div className="h-44 bg-gray-300 rounded-t-lg"></div>
          <div className="p-4 flex flex-col">
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="flex gap-x-4 mb-2 justify-between">
              <div className="h-3 bg-gray-300 rounded w-1/3"></div>
              <div className="h-3 bg-gray-300 rounded w-1/4"></div>
            </div>
            <div className="h-3 bg-gray-300 rounded mb-2"></div>
            <div className="flex items-center justify-between">
              <div className="h-3 bg-gray-300 rounded w-1/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingCard;
