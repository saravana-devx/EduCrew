import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useAppDispatch } from "../../hooks/redux.hook";
import { ProfileAPI } from "../../api/auth/ProfileAPI";
import Spinner from "../../components/common/spinner/Spinner";
import { NoPurchasedCoursesError } from "../../components/common/error/ErrorPage";
import CourseCard from "../../components/course/CourseCard";
import { setCourseProgress } from "../../redux/slices/userSlice";
import { CourseAPI } from "../../api/course/CourseAPI";

const StudentDashboard: React.FC = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const result = await ProfileAPI.profileDetails();

        const courseProgress = await CourseAPI.getCourseByProgress();

        dispatch(setCourseProgress(courseProgress));
        if (result && result.data && result.data.courses) {
          setCourses(result.data.courses);
        } else {
          toast.error("Invalid response structure");
        }
      } catch (error: unknown) {
        if (error instanceof AxiosError && error.response?.status === 404) {
          toast.error("Failed to fetch courses");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="lg:p-6 max-w-7xl mx-auto  lg:min-h-[720px] rounded-lg overflow-x-hidden">
      <header className="bg-indigo-600 text-white p-12 rounded-t-lg shadow-md">
        <h1 className="text-4xl font-bold">Your Courses</h1>
        <p className="text-lg mt-2">
          Manage your learning journey effectively.
        </p>
      </header>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          {courses.length === 0 ? (
            <NoPurchasedCoursesError />
          ) : (
            <div className="w-full gap-6">
              <CourseCard courses={courses} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
