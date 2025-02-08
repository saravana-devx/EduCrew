import React from "react";

type StatsCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
};

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-gradient-to-r from-indigo-500 to-indigo-700 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-white text-sm font-semibold uppercase tracking-wide mb-1">
            {title}
          </h4>
          <h3 className="text-white text-3xl font-extrabold">{value}</h3>
        </div>
        <div className="text-white text-4xl opacity-80">{icon}</div>
      </div>
    </div>
  );
};

export default StatsCard;
