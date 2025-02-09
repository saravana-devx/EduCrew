import React, { useState } from "react";
import CourseTable from "../../components/dashboard/Admin/CoursesTable";
import UserTable from "../../components/dashboard/Admin/UsersTable";
import {
  EarningsByCourse,
  PieChart,
} from "../../components/dashboard/Admin/Chart";

const AdminDashboard = () => {
  const [currentTab, setCurrentTab] = useState<"Courses" | "Users">("Courses");
  console.log("current tab -> ", currentTab);

  return (
    <div className="container mx-auto w-full px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl text-black text-center font-semibold my-8">
        Admin Dashboard
      </h1>
      <div className="flex flex-col sm:flex-row gap-6 xl:gap-8 justify-between items-center xl:items-start">
        {/* EarningsByCourse and PieChart */}
        <div className="w-full p-4">
          <EarningsByCourse />
        </div>
        <div className="w-full p-4">
          <PieChart />
        </div>
      </div>

      <div className="mt-16 flex justify-center gap-4">
        {/* Tab Buttons */}
        <button
          className={`py-2 px-6 rounded-full text-lg transition-colors duration-300 ${
            currentTab === "Courses"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setCurrentTab("Courses")}
        >
          Courses
        </button>
        <button
          className={`py-2 px-6 rounded-full text-lg transition-colors duration-300 ${
            currentTab === "Users"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setCurrentTab("Users")}
        >
          Users
        </button>
      </div>

      {/* Conditional Rendering for Tables */}
      <div className="my-6">
        {currentTab === "Courses" && <CourseTable />}
        {currentTab === "Users" && <UserTable />}
      </div>
    </div>
  );
};

export default AdminDashboard;
