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

  const dispatch = useAppDispatch();
  const loading = useAppSelector(getLoading);
  const courses = useAppSelector((state) => state.courseDetail.courses); // Assuming courses are stored in Redux

  // Fetch all courses By Page number
  const fetchCoursesByPageNo = async (page: number) => {
    const limit = 8;
    try {
      dispatch(setLoading(true));
      const response = await CourseAPI.getCourseByPage(limit, page);
      const totalCourses = response.data.totalCourses;
      setTotalPages(Math.ceil(totalCourses / limit));
      dispatch(setCourses(response.data.courses));
    } catch (error: unknown) {
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Fetch courses by category
  const fetchCategoryCourses = async (selectedCategory: string) => {
    try {
      dispatch(setLoading(true));
      const response = await CourseAPI.getCourseByCategory(selectedCategory);
      setCategoryCourses(response.data.courses);
      setTotalPages(1);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          setCategoryCourses([]);
          setTotalPages(1);
        }
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Handle category selection
  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    setPage(1);

    if (selectedCategory === "") {
      setCategoryCourses(null); // Reset categoryCourses to null when fetching all courses
      fetchCoursesByPageNo(1);
    } else {
      fetchCategoryCourses(selectedCategory);
    }
  };

  // Handle pagination click
  const handlePageClick = (currentPage: number) => {
    setPage(currentPage);

    if (category === "") {
      fetchCoursesByPageNo(currentPage);
    } else {
      fetchCategoryCourses(category);
    }
  };

  // Initial fetch (All Categories)
  useEffect(() => {
    fetchCoursesByPageNo(1);
  }, [dispatch]);

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
