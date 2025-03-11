import React from "react";
import { GoPerson } from "react-icons/go";
import { IoBookOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import "react-circular-progressbar/dist/styles.css";
import { Course } from "../../redux/slices/courseDetailSlice";
import { useAppSelector } from "../../hooks/redux.hook";
import {
  getCourseProgress,
  getUserDetails,
} from "../../redux/slices/userSlice";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

type CourseCardProps = {
  courses: Course[];
};

function createSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/--+/g, "-")
    .slice(0, 100);
}

const truncateLetters = (text: string, maxLetters: number): string => {
  if (text.length > maxLetters) {
    return text.slice(0, maxLetters) + "..."; // Add ellipsis if truncated
  }
  return text;
};

const CourseCard: React.FC<CourseCardProps> = ({ courses }) => {
  const navigate = useNavigate();
  const user = useAppSelector(getUserDetails);
  const courseProgress = useAppSelector(getCourseProgress);

  const calculatePercentage = (id: string): number => {
    if (courseProgress.length < 0) {
      return 0;
    }
    const progress = courseProgress.find(
      (progress) => progress.courseId === id
    );
    let percentage;
    if (progress && progress.totalVideos) {
      percentage = (
        (progress.completedVideos.length / progress.totalVideos) *
        100
      ).toFixed(0);
    }
    return Number(percentage);
  };

  const getCourseDetails = async (courseId: string, courseName: string) => {
    const slug = createSlug(courseName);
    navigate(`/course/${courseId}/${slug}`);
  };

  return (
    <>
      <div className="w-full lg:gap-x-10 mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center gap-y-8">
        {courses.map((course) => {
          const percentage = calculatePercentage(course._id) || 0;
          const isCompleted = percentage === 100;

          return (
            <div
              key={course._id}
              className="w-11/12 lg:max-w-80 xl:w-72 flex  flex-col bg-white shadow-lg rounded-lg transition-transform transform hover:scale-105"
            >
              <div className="relative">
                <img
                  src={course.thumbnail}
                  className="w-full h-56 lg:h-44 object-fill rounded-t-lg cursor-pointer"
                  onClick={() => {
                    getCourseDetails(course._id, course.courseName);
                  }}
                  alt={course.courseName || "Course Image"}
                />

                {user.accountType === "Student" &&
                  user.enrolledCourses?.includes(course._id) && (
                    <div className="absolute w-12 h-12 top-2 right-2 bg-white rounded-full p-2 shadow">
                      <CircularProgressbar
                        value={percentage}
                        text={`${percentage}%`}
                        styles={buildStyles({
                          rotation: 0,
                          strokeLinecap: "round",
                          textSize: "34px",
                          pathTransitionDuration: 0.8,
                          pathColor: isCompleted
                            ? "rgba(16, 185, 129, 1)" // Green for completed courses
                            : `rgba(79, 70, 229, ${percentage / 100})`, // Indigo for in-progress
                          textColor: isCompleted ? "#10b981" : "#4f46e5", // Match path color
                          trailColor: "#e5e7eb",
                        })}
                      />
                    </div>
                  )}

                <p className="absolute bg-white font-bold text-black border-gray-800 z-10 top-4 left-4 px-2 py-1 text-sm rounded-md shadow">
                  {course.category}
                </p>
              </div>
              <div className="p-4 flex flex-col flex-grow h-36">
                <div className="flex gap-x-4 mb-2 justify-between">
                  <p className="text-sm text-gray-600 flex items-center gap-x-1">
                    <GoPerson />
                    {course.studentEnrolled?.length || 0} students
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-x-1">
                    <IoBookOutline />
                    {course.content?.length || 0} modules
                  </p>
                </div>
                <p className="text-lg font-bold text-wrap min-h-14 text-slate-900 mb-2 cursor-pointer">
                  {truncateLetters(course.courseName, 30)}
                </p>
                <div className="flex justify-between items-center">
                  <p className="text-gray-500 text-sm opacity-90">
                    ~{course.instructor.firstName} {course.instructor.lastName}
                  </p>
                  {user.enrolledCourses?.includes(course?._id ?? "") ? null : (
                    <p className="text-lg font-bold text-indigo-600">
                      &#8377;{course.price}
                    </p>
                  )}
                </div>
                {isCompleted && (
                  <div className="absolute bottom-2 right-2 bg-green-500 text-white text-base font-bold px-3 py-1 rounded-md shadow-md">
                    Completed
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CourseCard;
