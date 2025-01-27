import React, { useEffect, useState } from "react";
import LoadingCard from "../../components/course/LoadingCard";
import {
  Course,
  getCourses,
  getLoading,
  setCourses,
  setLoading,
} from "../../redux/slices/courseDetailSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import { CourseAPI } from "../../api/course/CourseAPI";
import { CategoryCourseNotFoundError } from "../../components/common/error/ErrorPage";
import CourseCard from "../../components/course/CourseCard";
import SearchInput from "../../components/common/SearchInput";

const Courses: React.FC = () => {
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

  useEffect(() => {
    if (courses.length === 0) {
      dispatch(setLoading(true));
      CourseAPI.getAllCourses()
        .then((result) => {
          console.log("result of getAllCourses API -> ", result);
          dispatch(setCourses(result.data.courses));
          console.log(courses);
        })
        .catch((error) => {
          dispatch(setLoading(false));
          console.error("Failed to fetch courses: ", error);
        });
    }
  }, [dispatch, courses]);
  const loading = useAppSelector(getLoading);

  return (
    <div className="max-w-7xl min-h-screen h-full mx-auto flex flex-col items-start">
      <SearchInput />
      <div className="flex flex-col ms-8 lg:ms-12 xl:ms-0">
        <label className="flex gap-x-4 items-center text-sm font-medium text-gray-700">
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
          <option value="">All Category</option>
          <option value="Personal Development">Personal Development</option>
          <option value="Technology">Technology</option>
          <option value="Business">Business</option>
          <option value="Design">Design</option>
          <option value="Marketing">Marketing</option>
          <option value="Finance">Finance</option>
        </select>
      </div>
      {loading ? (
        <LoadingCard />
      ) : categoryCourses && categoryCourses.length > 0 ? (
        <CourseCard courses={categoryCourses} />
      ) : (
        <CategoryCourseNotFoundError />
      )}
    </div>
  );
};

export default Courses;
