import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux.hook";
import {
  getActiveCourse,
  getLoading,
  setActiveCourse,
  setLoading,
} from "../../../redux/slices/courseDetailSlice";
import {
  addEnrolledCourse,
  getUserDetails,
  loggedInStatus,
} from "../../../redux/slices/userSlice";

import { CourseAPI } from "../../../api/course/CourseAPI";
import { RatingAndReviewAPI } from "../../../api/rating/RatingAPI";

import DisplayRating from "../../common/DisplayReview/DisplayRating";
import ReviewCard from "../../common/DisplayReview/ReviewCard";
import SearchInput from "../../common/SearchInput";
import { makePayment } from "../../payment/makePayment";

import Spinner from "../../common/spinner/Spinner";

import { SomethingWentWrong } from "../../common/error/SomethingWentWrong";
import dateFormatter from "../../../utils/dateFormatter";

import Content from "./Content";

const createSlug = (title: string) =>
  title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/--+/g, "-")
    .slice(0, 50);

const Course: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const activeCourse = useAppSelector(getActiveCourse);
  const userDetails = useAppSelector(getUserDetails);
  const isLoggedIn = useAppSelector(loggedInStatus);

  const loading = useAppSelector(getLoading);
  const [rating, setRating] = useState(0);

  const hasPurchased =
    userDetails?.accountType === "Admin" ||
    userDetails?.enrolledCourses?.some(
      (courseId) => courseId === activeCourse?._id
    );

  const { courseId } = useParams();

  // Fetch course details and ratings
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        // Fetch course details
        dispatch(setActiveCourse(null));
        dispatch(setLoading(true));
        const courseResponse = await CourseAPI.getCourseById(
          courseId as string
        );
        dispatch(setActiveCourse(courseResponse.data.course));

        // Fetch course rating
        const ratingResponse = await RatingAndReviewAPI.getAverageRating(
          courseId as string
        );
        setRating(ratingResponse.data.averageRating || 0);
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (courseId) {
      fetchCourseData();
    }
  }, [courseId, dispatch]);

  if (!activeCourse) {
    if (loading) {
      return (
        <div className="h-screen">
          <Spinner />
        </div>
      );
    } else {
      return (
        <div>
          <SearchInput />
          <SomethingWentWrong />
        </div>
      );
    }
  }

  const handleBuyCourse = async () => {
    if (!isLoggedIn) {
      toast.info("Please log in to purchase a course.");
      return navigate("/login");
    }

    if (userDetails.accountType === "Instructor") {
      return toast.error("Instructors can't purchase courses.");
    }

    await makePayment(activeCourse._id, (courseId) =>
      dispatch(addEnrolledCourse(courseId))
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6 flex flex-col items-center">
      <div className="w-full flex flex-col md:flex-row gap-8">
        {/* Course Content */}
        <div className={`w-full ${hasPurchased ? "lg:text-center" : ""}`}>
          <img
            src={activeCourse.thumbnail}
            alt={activeCourse.courseName || "Course Image"}
            className={`${
              hasPurchased
                ? "rounded-3xl object-fill lg:w-[640px] h-[240px] lg:h-[380px] mx-auto mb-6"
                : "w-full mb-6"
            }`}
          />
          {hasPurchased && (
            <Link
              to={`/courseVideos/${createSlug(activeCourse.courseName)}`}
              className="mt-6 flex justify-center items-center px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              View Course
            </Link>
          )}
          <h1 className="text-2xl lg:text-3xl font-bold my-8 lg:my-4">
            {activeCourse.courseName}
          </h1>
          <div className="flex lg:justify-center lg:items-center gap-4 mb-6">
            <img
              src={activeCourse.instructor.image}
              alt="Instructor"
              className="w-8 h-8 rounded-full object-cover"
            />
            <p className="text-xl font-semibold">
              {activeCourse.instructor.firstName}&nbsp;
              {activeCourse.instructor.lastName}
            </p>
          </div>
          <div className="flex text-base flex-col lg:flex-row justify-around gap-4 text-gray-600 text-left lg:text-center">
            <p>
              <span className="text-lg font-semibold text-indigo-400">
                Rating &nbsp; : &nbsp;
              </span>
              <DisplayRating value={rating} />
            </p>
            <p>
              <span className="text-lg font-semibold text-indigo-400">
                Students Enrolled &nbsp; : &nbsp;
              </span>
              {activeCourse.studentEnrolled?.length || 0}
            </p>
            <p>
              <span className="text-lg font-semibold text-indigo-400">
                Updated At&nbsp; : &nbsp;
              </span>
              {dateFormatter(activeCourse.updatedAt)}
            </p>
            <p>
              <span className="text-lg font-semibold text-indigo-400">
                Language&nbsp; : &nbsp;
              </span>
              English
            </p>
          </div>
          <div className="mt-6 text-left">
            <h2 className="text-2xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700 leading-relaxed">
              {activeCourse.description}
            </p>
            {activeCourse.content && <Content content={activeCourse.content} />}
          </div>
        </div>

        {!hasPurchased && (
          <div className="md:w-1/3 min-h-[320px] w-full flex flex-col gap-8 items-center">
            <div className="bg-blue-50 p-6 rounded-lg shadow-md w-full">
              <h2 className="text-2xl font-semibold mb-4">
                What you will learn
              </h2>
              <ul className="list-disc pl-5 text-gray-700 text-left">
                {activeCourse.whatYouWillLearn?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center gap-x-4 items-center">
              <h2 className="text-3xl font-semibold text-slate-900">Price</h2>
              <p className="text-3xl text-indigo-600 font-bold">
                ₹{activeCourse.price}
              </p>
            </div>
            <button
              onClick={handleBuyCourse}
              className="px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              Buy Now
            </button>
          </div>
        )}
      </div>
      {!hasPurchased && (
        <div className="w-full max-w-7xl mx-auto p-6 overflow-hidden select-none">
          <h2 className="text-2xl font-bold mb-4">Course Ratings & Reviews</h2>
          <ReviewCard
            reviews={activeCourse.ratingAndReview || []}
            shouldScroll={
              activeCourse.ratingAndReview &&
              activeCourse.ratingAndReview.length > 3
            }
          />
        </div>
      )}
    </div>
  );
};

export default Course;
