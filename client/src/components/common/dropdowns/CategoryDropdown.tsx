import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux.hook";
import {
  getCourses,
  setLoading,
  Course
} from "../../../redux/slices/courseDetailSlice";
import { CourseAPI } from "../../../api/course/CourseAPI";

const CategoryDropDown: React.FC = () => {
  const [category, setCategory] = useState<string>("");
  const [categoryCourses, setCategoryCourses] = useState<Course[] | null>([]);

  const dispatch = useAppDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const courses = useAppSelector(getCourses);

  useEffect(() => {
    if (category === "") {
      setCategoryCourses(courses);
    } else {
      dispatch(setLoading(true));
      CourseAPI.getCourseByCategory(category)
        .then((result) => {
          setCategoryCourses(result.data.courses);
          dispatch(setLoading(false));
        })
        .catch((error) => {
          dispatch(setLoading(false));
          if (error.response.data.status === 404) {
            setCategoryCourses(null);
          }
        });
    }
  }, [category, courses]);

  return (
    <div className="flex flex-col">
      <label className="block text-sm font-medium text-gray-700">
        Select Category
      </label>
      <select
        name="category"
        id="category"
        value={category}
        onChange={handleInputChange}
        className="w-full px-4 py-2 mt-2 bg-indigo-50 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300 focus:border-indigo-500 transition-all"
        required
      >
        <option value="">Select Category</option>
        <option value="Personal Development">Personal Development</option>
        <option value="Technology">Technology</option>
        <option value="Business">Business</option>
        <option value="Design">Design</option>
        <option value="Marketing">Marketing</option>
        <option value="Finance">Finance</option>
      </select>
    </div>
  );
};

export default CategoryDropDown;
