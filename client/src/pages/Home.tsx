import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux.hook";

import {
  getTopCourses,
  setLoading,
  setTopCourses,
} from "../redux/slices/courseDetailSlice";

import { CourseAPI } from "../api/course/CourseAPI";

import { SomethingWentWrong } from "../components/common/error/SomethingWentWrong";
import ReviewCard from "../components/common/DisplayReview/ReviewCard";
import SearchInput from "../components/common/SearchInput";

import HeroSection from "../components/Home/HeroSection";
import CourseCategories from "../components/Home/CourseCategories";
import WhyToChooseUs from "../components/Home/WhyToChooseUs";
import TopInstructors from "../components/Home/TopInstructors";
import TrustedSection from "../components/Home/TrustedSection";
import BecomeAnInstructor from "../components/Home/BecomeAnInstructor";
import CallToAction from "../components/Home/callToAction";

import LoadingCard from "../components/course/LoadingCard";
import CourseCard from "../components/course/CourseCard";

import { reviews } from "../utils/reviews";
import axios from "axios";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.courseDetail.loading);
  const courses = useAppSelector(getTopCourses);

  useEffect(() => {
    const getTopCourses = async () => {
      console.log("fetching top-courses");
      try {
        dispatch(setLoading(true));
        const response = await CourseAPI.getTopCourses();
        dispatch(setTopCourses(response.data));
        dispatch(setLoading(false));
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error);
        }
      } finally {
        dispatch(setLoading(false));
      }
    };
    console.log("length of courses -> ", courses.length);
    if (courses.length === 0) {
      getTopCourses();
    }
  }, [courses]);

  return (
    <div className="w-full h-auto">
      <SearchInput />
      <main className="w-full h-full">
        <HeroSection />

        <section>
          <CourseCategories />
        </section>

        <section className="w-full mt-16 flex flex-col gap-y-4">
          <div className="w-full mx-auto text-center">
            <p className="text-gray-500 text-sm md:text-base">
              10,000+ UNIQUE COURSES
            </p>
            <h1 className="text-slate-900 text-2xl md:text-3xl font-bold">
              You May Also Like More Courses
            </h1>
            <p className="text-gray-400 mt-2 text-sm md:text-base">
              Take the next step toward achieving your personal and professional
              aspirations with Quiklearn
            </p>
            <p className="text-gray-400 text-sm md:text-base">
              Book it Has Survived Not Only Five Centuries
            </p>
          </div>
          <div className="w-full 2xl:w-4/6 mx-auto">
            {/* Conditional Rendering */}
            {/* {loading ? (
              <LoadingCard />
            ) : courses.length === 0 ? (
              <div className="col-span-full flex justify-center items-center">
                <SomethingWentWrong />
              </div>
            ) : (
              <CourseCard courses={courses} />
            )} */}
            {loading && <LoadingCard />}
            {!loading ? (
              courses && courses.length === 0 ? (
                <div className="col-span-full flex justify-center items-center">
                  <SomethingWentWrong />
                </div>
              ) : (
                <CourseCard courses={courses} />
              )
            ) : (
              <LoadingCard />
            )}
          </div>
        </section>

        <section>
          <WhyToChooseUs />
        </section>

        <section className="flex flex-col gap-y-8">
          <div className="w-11/12 mx-auto text-center">
            <p className="text-gray-400 font-medium text-sm md:text-base">
              OUR INSTRUCTORS
            </p>
            <h2 className="text-2xl md:text-3xl mt-2 font-bold text-slate-900">
              From The LearnSphere Community
            </h2>
            <p className="text-gray-400 mt-1 text-sm md:text-base">
              When An unknown Printer Took A Galley of Type And Scrambled It To
              Make A Type Specimen
            </p>
            <p className="text-gray-400 mt-2 text-sm md:text-base">
              Book it Has Survived Not Only Five Centuries
            </p>
          </div>
          <div className="">
            <TopInstructors />
          </div>
        </section>

        <section className="mt-8">
          <BecomeAnInstructor />
        </section>

        <section>
          <TrustedSection />
        </section>

        <section>
          <CallToAction />
        </section>
        <section className="w-full mx-auto text-center mt-10 px-4">
          <div>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-lg font-semibold text-blue-600 uppercase">
                Reviews
              </h2>
              <p className="text-3xl font-bold tracking-tight text-gray-900 mt-2">
                Hear from Our Clients
              </p>
              <p className="mt-4 text-gray-500">
                Discover what our satisfied clients have to say about their
                experiences. Real feedback, real success stories, and genuine
                testimonials that inspire trust.
              </p>
            </div>
            <ReviewCard reviews={reviews} shouldScroll={false} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
