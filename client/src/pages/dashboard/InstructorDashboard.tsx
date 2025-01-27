import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBook, FaUsers, FaRupeeSign } from "react-icons/fa";
import { toast } from "react-toastify";

import StatsCard from "./StatsCard";

import { useAppDispatch } from "../../hooks/redux.hook";
import { ProfileAPI } from "../../api/auth/ProfileAPI";
import { CourseAPI } from "../../api/course/CourseAPI";
import { NoCreatedCoursesError } from "../../components/common/error/ErrorPage";
import {
  clearCourseData,
  setActiveCourse,
} from "../../redux/slices/courseEditorSlice";

interface Course {
  _id: string;
  courseName: string;
  description: string;
  instructor: string;
  thumbnail: string;
  price: number;
  studentEnrolled: string[];
  status: string;
  totalStudentsEnrolled: number;
}

interface DashboardData {
  courses: Course[];
  totalEarnings: number;
}

const InstructorDashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    ProfileAPI.getInstructorDashboardData()
      .then((result) => {
        if (result && result.data) {
          setDashboardData(result.data);
        } else {
          toast.error("Invalid response structure");
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          toast.error("You haven't created a course yet");
        } else {
          toast.error("Failed to fetch instructor data");
        }
      });
  }, []);

  const handleToggleStatus = async (
    courseId: string,
    currentStatus: string
  ) => {
    try {
      const newStatus = currentStatus === "Published" ? "Draft" : "Published";
      await CourseAPI.updateCourseStatus(courseId, newStatus);
      setDashboardData((prevData) => {
        if (!prevData) return null;
        return {
          ...prevData,
          courses: prevData.courses.map((course) =>
            course._id === courseId ? { ...course, status: newStatus } : course
          ),
        };
      });
      toast.success(`Course status updated to ${newStatus}`);
    } catch (error) {
      toast.error("Failed to update course status");
    }
  };

  const handleDelete = async (courseId: string) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await CourseAPI.deleteCourseByInstructor(courseId);
        setDashboardData((prevData) => {
          if (!prevData) return null;
          return {
            ...prevData,
            courses: prevData.courses.filter(
              (course) => course._id !== courseId
            ),
          };
        });
        toast.success("Course deleted successfully");
      } catch (error) {
        toast.error("Failed to delete course");
      }
    }
  };

  const handleEdit = async (courseId: string) => {
    const result = await CourseAPI.getCourseById(courseId);
    if (result && result.data) {
      dispatch(clearCourseData());
      dispatch(setActiveCourse(result.data.course));
      navigate(`/edit-course/${result.data.course._id}`);
    } else {
      toast.error("Failed to fetch course details");
    }
  };

  if (!dashboardData) {
    return (
      <div>
        <NoCreatedCoursesError />
      </div>
    );
  }

  const { courses, totalEarnings } = dashboardData;

  return (
    <div className="p-6 bg-gray-100 min-h-[700px] mt-4">
      <h2 className="text-2xl font-bold mb-4">Instructor Dashboard</h2>

      <div className="max-w-4xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatsCard
          title="Total Courses"
          value={courses.length}
          icon={<FaBook size={24} />}
        />
        <StatsCard
          title="Total Enrollment"
          value={courses.reduce(
            (total: number, course: Course) =>
              total + course.totalStudentsEnrolled,
            0
          )}
          icon={<FaUsers size={24} />}
        />
        <StatsCard
          title="Revenue"
          value={totalEarnings}
          icon={<FaRupeeSign size={24} />}
        />
      </div>

      <h3 className="text-xl font-bold mb-4">Your Courses</h3>
      <div className="bg-white rounded-lg shadow-md p-6 h-full">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left py-4 px-6 text-gray-600 font-semibold uppercase text-sm border-b">
                Course Title
              </th>
              <th className="text-center py-4 px-6 text-gray-600 font-semibold uppercase text-sm border-b">
                Total Students
              </th>
              <th className="text-center  px-6 text-gray-600 font-semibold uppercase text-sm border-b">
                Status
              </th>
              <th className="text-center py-4 px-6 text-gray-600 font-semibold uppercase text-sm border-b">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr
                key={course._id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="py-4 px-6 border-b">
                  <div className="text-gray-900 font-medium">
                    {course.courseName}
                  </div>
                </td>
                <td className="py-4 px-6 border-b text-gray-700 text-center">
                  {course.studentEnrolled.length}{" "}
                  {/* Updated to reflect actual student count */}
                </td>
                <td className="py-4 px-6 border-b text-center">
                  <button
                    className={`${
                      course.status === "Published"
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-red-500 hover:bg-red-600"
                    } text-white px-4 py-1 rounded-full transition-all duration-200 text-sm`}
                    onClick={() =>
                      handleToggleStatus(course._id, course.status)
                    }
                  >
                    {course.status === "Published" ? "Published" : "Draft"}
                  </button>
                </td>
                <td className="py-4 px-6 border-b">
                  <div className="flex space-x-3 justify-center">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-full transition-all duration-200 text-sm"
                      onClick={() => handleEdit(course._id)} // Passing course ID to the edit handler
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-full transition-all duration-200 text-sm"
                      onClick={() => handleDelete(course._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InstructorDashboard;
