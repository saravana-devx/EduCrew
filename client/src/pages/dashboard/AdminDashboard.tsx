import React, { useEffect, useState } from "react";
import { FaBook, FaUsers, FaChalkboardTeacher } from "react-icons/fa";

import StatsCard from "../../components/dashboard/StatsCard";
import Spinner from "../../components/common/spinner/Spinner";
import { Course, Query, UserDetails } from "../../utils/types";
import { ProfileAPI } from "../../api/auth/ProfileAPI";
import { CourseAPI } from "../../api/course/CourseAPI";
import { toast } from "react-toastify";
import { AuthAPI } from "../../api/auth/AuthAPI";
import { ContactAPI } from "../../api/contact/ContactAPI";

const AdminDashboard: React.FC = () => {
  const [currentTab, setCurrentTab] = useState("courses");
  const [isLoading, setIsLoading] = useState(false);
  const [courseList, setCourseList] = useState<Course[]>([]);
  const [userList, setUserList] = useState<UserDetails[]>([]);
  const [queryList, setQueryList] = useState<Query[]>([]);
  const [studentCount, setStudentCount] = useState(0);
  const [instructorCount, setInstructorCount] = useState(0);
  const [courseCount, setCourseCount] = useState(0);
  useEffect(() => {
    const fetchAdminDashboardDetails = async () => {
      setIsLoading(true);
      try {
        const result = await ProfileAPI.getAdminDashboardData();
        setCourseList(result.data.courses);
        setUserList(result.data.users);
        setQueryList(result.data.queries);
        setInstructorCount(result.data.totalInstructors);
        setStudentCount(result.data.totalStudents);
        setCourseCount(result.data.totalCourses);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
        console.log(queryList);
      }
    };

    fetchAdminDashboardDetails();
  }, []);
  const handleDeleteCourse = async (courseId: string) => {
    try {
      await CourseAPI.deleteCourseByAdmin(courseId);
      toast.success("Course deleted successfully");
      setCourseList((prevData) =>
        prevData.filter((course) => course._id !== courseId)
      );
    } catch (error) {
      toast.error("Failed to delete course. Please try again.");
    }
  };

  const handleActiveStatus = async (userId: string, isActive: boolean) => {
    try {
      await AuthAPI.toggleUserActiveStatus(userId, isActive);

      setUserList((prevUserList) =>
        prevUserList.map((user) =>
          user._id === userId ? { ...user, isActive } : user
        )
      );

      toast.success(
        `User has been ${isActive ? "activated" : "deactivated"} successfully!`
      );
    } catch (error) {
      toast.error("Failed to change status");
    }
  };

  const handleDeleteQuery = async (queryId: string) => {
    try {
      await ContactAPI.deleteQueryById(queryId);
      setQueryList((prevQueries) =>
        prevQueries.filter((query) => query._id !== queryId)
      );

      toast.success("Query deleted successfully");
    } catch (error) {
      toast.error("Failed to delete query");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-[700px] mt-4">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

      <div>{isLoading && <Spinner />}</div>

      {/* Stats Cards Section */}
      <div className="max-w-4xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatsCard
          title="Total Courses"
          value={courseCount}
          icon={<FaBook size={24} />}
        />
        <StatsCard
          title="Total Students"
          value={studentCount}
          icon={<FaUsers size={24} />}
        />
        <StatsCard
          title="Total Instructors"
          value={instructorCount}
          icon={<FaChalkboardTeacher size={24} />}
        />
      </div>

      {/* Tabs Section */}
      <div className="mb-6">
        <button
          className={`mr-4 py-2 px-4 rounded ${
            currentTab === "courses"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setCurrentTab("courses")}
        >
          Courses
        </button>
        <button
          className={`mr-4 py-2 px-4 rounded ${
            currentTab === "users"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setCurrentTab("users")}
        >
          Users
        </button>
        <button
          className={`py-2 px-4 rounded ${
            currentTab === "queries"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setCurrentTab("queries")}
        >
          Queries
        </button>
      </div>

      {/* Conditional Rendering based on active tab */}
      {currentTab === "courses" && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Courses List</h3>
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left py-4 px-6 text-gray-600 font-semibold uppercase text-sm border-b">
                  Course Title
                </th>
                <th className="text-left py-4 px-6 text-gray-600 font-semibold uppercase text-sm border-b">
                  Instructor
                </th>
                <th className="text-left py-4 px-6 text-gray-600 font-semibold uppercase text-sm border-b flex justify-center items-center">
                  Total Students
                </th>
                <th className="text-left py-4 px-6 text-gray-600 font-semibold uppercase text-sm border-b">
                  Status
                </th>
                <th className="text-left py-4 px-6 text-gray-600 font-semibold uppercase text-sm border-b">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {courseList.map((course) => (
                <tr
                  key={course._id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="py-4 px-6 border-b">{course.courseName}</td>
                  <td className="py-4 px-6 border-b">
                    {course.instructor.firstName}&nbsp;
                    {course.instructor.lastName}
                  </td>
                  <td className="py-4 px-6 border-b flex justify-center items-center">
                    {course.studentEnrolled?.length}
                  </td>
                  <td className="py-4 px-6 border-b">
                    <button
                      className={`${
                        course.status === "Published"
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-red-500 hover:bg-red-600"
                      } text-white px-4 py-1 rounded-full transition-all duration-200 text-sm`}
                    >
                      {course.status === "Published" ? "Published" : "Draft"}
                    </button>
                  </td>
                  <td className="py-4 px-6 border-b">
                    <button
                      onClick={() => {
                        handleDeleteCourse(course._id);
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-full transition-all duration-200 text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {currentTab === "users" && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Users List</h3>
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left py-4 px-6 text-gray-600 font-semibold uppercase text-sm border-b">
                  Name
                </th>
                <th className="text-left py-4 px-6 text-gray-600 font-semibold uppercase text-sm border-b">
                  Email
                </th>
                <th className="text-left py-4 px-6 text-gray-600 font-semibold uppercase text-sm border-b">
                  Role
                </th>
                <th className="text-left py-4 px-6 text-gray-600 font-semibold uppercase text-sm border-b">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {userList.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="py-4 px-6 border-b">
                    {user.firstName + " " + user.lastName}
                  </td>
                  <td className="py-4 px-6 border-b">{user.email}</td>
                  <td className="py-4 px-6 border-b">{user.accountType}</td>
                  <td className="py-4 px-6 border-b">
                    <button
                      onClick={() => {
                        handleActiveStatus(user._id, !user.isActive);
                      }}
                      className={`${
                        user.isActive
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-red-500 hover:bg-red-600"
                      } text-white px-4 py-1 rounded-full transition-all duration-200 text-sm`}
                    >
                      {user.isActive ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* New Query Table */}
      {currentTab === "queries" && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 overflow-x-scroll">
          <h3 className="text-xl font-semibold mb-4">User Queries</h3>
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left py-4 px-6 text-gray-600 font-semibold uppercase text-sm border-b">
                  Name
                </th>
                <th className="text-left py-4 px-6 text-gray-600 font-semibold uppercase text-sm border-b">
                  Email
                </th>
                <th className="text-left py-4 px-6 text-gray-600 font-semibold uppercase text-sm border-b">
                  Phone Number
                </th>
                <th className="text-left py-4 px-6 text-gray-600 font-semibold uppercase text-sm border-b">
                  Query
                </th>
                <th className="text-left py-4 px-6 text-gray-600 font-semibold uppercase text-sm border-b">
                  Date Sent
                </th>

                <th className="text-left py-4 px-6 text-gray-600 font-semibold uppercase text-sm border-b">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {queryList.map((query) => (
                <tr
                  key={query._id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="py-4 px-6 border-b text-gray-900">
                    {query.firstName + " " + query.lastName}
                  </td>
                  <td className="py-4 px-6 border-b text-gray-700">
                    {query.email}
                  </td>
                  <td className="py-4 px-6 border-b text-gray-700">
                    {query.phone}
                  </td>
                  <td className="py-4 px-6 border-b text-gray-700">
                    {query.message}
                  </td>
                  <td className="py-4 px-6 border-b text-gray-700">
                    {(() => {
                      const date = new Date(query.createdAt);
                      return `${(date.getMonth() + 1)
                        .toString()
                        .padStart(2, "0")}/${date
                        .getDate()
                        .toString()
                        .padStart(2, "0")}/${date.getFullYear()}`;
                    })()}
                  </td>
                  <td className="py-4 px-6 border-b ">
                    <button
                      onClick={() => handleDeleteQuery(query._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-full transition-all duration-200 text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
