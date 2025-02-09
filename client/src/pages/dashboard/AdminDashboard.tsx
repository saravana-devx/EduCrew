import React, { useState } from "react";
import CourseTable from "../../components/dashboard/Admin/CoursesTable";
import UserTable from "../../components/dashboard/Admin/UsersTable";

const AdminDashboard = () => {
  const [currentTab, setCurrentTab] = useState<"Courses" | "Users">("Courses");
  console.log("current tab -> ", currentTab);
  return (
    <div>
      <div className="mb-6">
        <button
          className={`mr-4 py-2 px-4 rounded ${
            currentTab === "Courses"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setCurrentTab("Courses")}
        >
          Courses
        </button>
        <button
          className={`mr-4 py-2 px-4 rounded ${
            currentTab === "Users"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setCurrentTab("Users")}
        >
          Users
        </button>
      </div>
      <div>{currentTab === "Courses" && <CourseTable />}</div>
      <div>{currentTab === "Users" && <UserTable />}</div>
    </div>
  );
};

export default AdminDashboard;
