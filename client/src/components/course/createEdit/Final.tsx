import React from "react";

import { useNavigate } from "react-router-dom";

import { FaCheckCircle } from "react-icons/fa";
import {
  clearCourseData,
  getCourseData,
  setStep,
} from "../../../redux/slices/courseEditorSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux.hook";
import { CourseAPI } from "../../../api/course/CourseAPI";

const Final: React.FC = () => {
  const course = useAppSelector(getCourseData);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handlePublishCourse = () => {
    if (course?._id) {
      CourseAPI.updateCourseStatus(course._id, "Published");
    }
    dispatch(clearCourseData());
    setStep(4);
    navigate("/instructor/dashboard");
  };

  return (
    <div className="p-8 bg-gray-100 shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-indigo-600">Final Review</h2>
        <FaCheckCircle className="text-green-500 text-3xl" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {course?.thumbnail && typeof course.thumbnail === "string" ? (
          <div className="w-full  rounded-lg overflow-hidden shadow-lg">
            <img
              src={course.thumbnail}
              alt="Course Thumbnail"
              className="w-full h-full object-cover"
            />
          </div>
        ) : null}

        {/* Course Information */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Course Information
          </h3>
          <div className="space-y-2">
            <p>
              <strong className="text-indigo-500">Course Name:</strong>{" "}
              {course?.courseName}
            </p>
            <p>
              <strong className="text-indigo-500">Description:</strong>{" "}
              {course?.description}
            </p>
            <p>
              <strong className="text-indigo-500">Instructor:</strong>{" "}
              {course?.instructor}
            </p>
            <p>
              <strong className="text-indigo-500">Price:</strong> ₹
              {course?.price}
            </p>
            {/* <div>
              <strong className="text-indigo-500">Instructions:</strong>
              <ul className="list-disc ml-5 mt-2">
                {course?.whatYouWillLearn.map((item, index) => (
                  <li key={index} className="text-gray-700">
                    {item}
                  </li>
                ))}
              </ul>
            </div> */}
            <p>
              <strong className="text-indigo-500">Category:</strong>{" "}
              {course?.category}
            </p>
            <p>
              <strong className="text-indigo-500">Status:</strong>{" "}
              {course?.status}
            </p>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h4 className="text-xl font-semibold text-gray-700 mb-4">
          Course Content
        </h4>
        {course?.content?.length ? (
          course.content.map((section) => (
            <div
              key={section._id}
              className="mb-4 p-4 bg-indigo-50 border-l-4 border-indigo-400 rounded-md shadow-md"
            >
              <h5 className="text-lg font-bold text-indigo-600 mb-2">
                {section.sectionName}
              </h5>
              {section.subSection?.length ? (
                <ul className="ml-4 space-y-2">
                  {section.subSection.map((subSection) => (
                    <li
                      key={subSection._id}
                      className="p-2 bg-white rounded-md shadow"
                    >
                      <p className="text-indigo-500 font-semibold">
                        {subSection.title}
                      </p>
                      <p className="text-gray-600">{subSection.description}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No subsections added</p>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-600">No sections added</p>
        )}
      </div>

      {/* Publish Button */}
      <div className="text-right">
        <button
          onClick={handlePublishCourse}
          className="px-8 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-md shadow hover:bg-indigo-700 transition"
        >
          Publish Course
        </button>
      </div>
    </div>
  );
};

export default Final;
