// import { useState } from "react";
// import CourseTable from "../../components/dashboard/Admin/CoursesTable";
// import UserTable from "../../components/dashboard/Admin/UsersTable";
// import {
//   EarningsByCourse,
//   PieChart,
// } from "../../components/dashboard/Admin/Chart";

// const AdminDashboard = () => {
//   const [currentTab, setCurrentTab] = useState<"Courses" | "Users">("Courses");

//   return (
//     <div className=" mx-auto w-full px-4 sm:px-6 lg:px-8">
//       <h1 className="text-3xl sm:text-4xl text-black text-center font-semibold my-8">
//         Admin Dashboard
//       </h1>
//       <div className="flex flex-col max-h-96 sm:flex-row gap-6 xl:gap-8 justify-between items-center xl:items-start">
//         {/* EarningsByCourse and PieChart */}
//         <div className="w-full p-4">
//           <EarningsByCourse />
//         </div>
//         <div className="w-full p-4">
//           <PieChart />
//         </div>
//       </div>

//       <div className="mt-16 flex justify-center gap-4">
//         {/* Tab Buttons */}
//         <button
//           className={`py-2 px-6 rounded-full text-lg transition-colors duration-300 ${
//             currentTab === "Courses"
//               ? "bg-blue-500 text-white"
//               : "bg-gray-200 text-gray-700"
//           }`}
//           onClick={() => setCurrentTab("Courses")}
//         >
//           Courses
//         </button>
//         <button
//           className={`py-2 px-6 rounded-full text-lg transition-colors duration-300 ${
//             currentTab === "Users"
//               ? "bg-blue-500 text-white"
//               : "bg-gray-200 text-gray-700"
//           }`}
//           onClick={() => setCurrentTab("Users")}
//         >
//           Users
//         </button>
//       </div>

//       <div className="my-6 w-full">
//         {currentTab === "Courses" && <CourseTable />}
//         {currentTab === "Users" && <UserTable />}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

import { useState } from "react";
import CourseTable from "../../components/dashboard/Admin/CoursesTable";
import UserTable from "../../components/dashboard/Admin/UsersTable";
import {
  EarningsByCourse,
  PieChart,
} from "../../components/dashboard/Admin/Chart";

const AdminDashboard = () => {
  const [currentTab, setCurrentTab] = useState<"Courses" | "Users">("Courses");

  return (
    <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl text-black text-center font-semibold my-6 sm:my-8">
        Admin Dashboard
      </h1>

      {/* Responsive Grid for Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:gap-8">
        <div className="w-full p-4 bg-white shadow-md rounded-lg">
          <EarningsByCourse />
        </div>
        <div className="w-full p-4 bg-white shadow-md rounded-lg">
          <PieChart />
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mt-12 flex justify-center gap-4 flex-wrap">
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

      {/* Responsive Table Container */}
      <div className="my-6 w-full overflow-x-auto">
        {currentTab === "Courses" && (
          <div className="min-w-[300px]">
            <CourseTable />
          </div>
        )}
        {currentTab === "Users" && (
          <div className="min-w-[300px]">
            <UserTable />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
