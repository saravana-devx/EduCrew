import React, { useEffect, useState } from "react";
import LoadingCard from "../../components/course/LoadingCard";
import {
  Course,
  getLoading,
  setCourses,
  setLoading,
} from "../../redux/slices/courseDetailSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import { CourseAPI } from "../../api/course/CourseAPI";
import { CategoryCourseNotFoundError } from "../../components/common/error/ErrorPage";
import CourseCard from "../../components/course/CourseCard";
import SearchInput from "../../components/common/SearchInput";
import Pagination from "../../components/course/CourseDetails/Pagination";
import axios from "axios";

const Courses: React.FC = () => {
  const [category, setCategory] = useState<string>("");
  const [categoryCourses, setCategoryCourses] = useState<Course[] | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 8;

  const dispatch = useAppDispatch();
  const loading = useAppSelector(getLoading);
  const courses = useAppSelector((state) => state.courseDetail.courses); // Assuming courses are stored in Redux

  // Fetch all courses
  const fetchCourses = async (currentPage: number) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/v1/course/api/get-courses?limit=${limit}&page=${currentPage}`
      );

      const totalCourses = response.data.data.totalCourses;
      setTotalPages(Math.ceil(totalCourses / limit));
      dispatch(setCourses(response.data.data.courses));
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  // Fetch courses by category
  const fetchCategoryCourses = async (selectedCategory: string) => {
    try {
      dispatch(setLoading(true));
      const result = await CourseAPI.getCourseByCategory(selectedCategory);
      setCategoryCourses(result.data.courses);
      setTotalPages(1);
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      if (error.response?.data?.status === 404) {
        setCategoryCourses([]);
        setTotalPages(1);
      }
    }
  };

  // Handle category selection
  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    setPage(1);

    if (selectedCategory === "") {
      fetchCourses(1);
      setCategoryCourses(null); // Reset categoryCourses to null when fetching all courses
    } else {
      fetchCategoryCourses(selectedCategory);
    }
  };

  // Handle pagination click
  const handlePageClick = (currentPage: number) => {
    setPage(currentPage);

    if (category === "") {
      fetchCourses(currentPage);
    } else {
      fetchCategoryCourses(category);
    }
  };

  // Initial fetch (All Categories)
  useEffect(() => {
    fetchCourses(1);
  }, [dispatch]);

  return (
    <div className="max-w-7xl min-h-screen h-full mx-auto flex flex-col items-start">
      <SearchInput />

      {/* Category Dropdown */}
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

      {/* Course List */}
      {loading && <LoadingCard />}

      {!loading &&
        (categoryCourses !== null ? (
          categoryCourses.length > 0 ? (
            <CourseCard courses={categoryCourses} />
          ) : (
            <CategoryCourseNotFoundError />
          )
        ) : (
          <CourseCard courses={courses} />
        ))}

      {/* Pagination Component */}
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          handlePageClick={handlePageClick}
        />
      )}
    </div>
  );
};

export default Courses;
