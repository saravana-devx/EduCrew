import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux.hook";
import {
  getActiveCourse,
  setActiveSubSection,
  getActiveSubSection,
} from "../../../redux/slices/courseDetailSlice";
import { RatingAndReviewAPI } from "../../../api/rating/RatingAPI";
import { CourseAPI } from "../../../api/course/CourseAPI";
import { setCompletedVideo } from "../../../redux/slices/userSlice";
import VideoJS from "./Video";
import ReviewFormModal from "../../common/Rating/ReviewFormModal";
import Content from "./Content";

const ViewCourseVideos: React.FC = () => {
  const activeCourse = useAppSelector(getActiveCourse);

  const dispatch = useAppDispatch();
  console.log("active course -> ", activeCourse);
  useEffect(() => {
    if (activeCourse?.content) {
      const firstSection = activeCourse.content[0];
      const firstSubsection = firstSection.subSection?.[0];
      dispatch(setActiveSubSection(firstSubsection));
      // console.log("first subSection -> ", firstSubsection);
    }
  }, [activeCourse, dispatch]);

  const handleReviewSubmit = async (rating: number, review: string) => {
    // console.log("Review Submitted: ", { rating, review });
    if (!activeCourse?._id) {
      console.error("Course ID is not available.");
      return;
    }
    await RatingAndReviewAPI.createRatingAndReview(
      activeCourse?._id,
      rating,
      review
    );
  };
  const activeSubSection = useAppSelector((state) =>
    getActiveSubSection(state)
  );

  const handleVideoCompletion = async () => {
    if (activeCourse?._id) {
      await CourseAPI.updateProgress(activeCourse._id, activeSubSection._id);
      // Mark the video as completed in your backend or update state
      dispatch(
        setCompletedVideo({
          courseId: activeCourse?._id,
          completedVideo: activeSubSection._id,
        })
      );
    }
  };

  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    sources:
      // activeSubSection.videoUrl
      // ?
      [
        {
          src: activeSubSection.video,
          type: "video/mp4",
        },
      ],
    // : [],
    playbackRateControl: true,
    playbackRates: [0.5, 1, 1.5, 2],
    controlBar: {
      pictureInPictureToggle: false, // Disable PiP control
      playbackRateMenuButton: true,
    },
  };
  // console.log(videoJsOptions)
  return (
    <div className="max-w-9xl lg:px-12 mx-auto mt-8 flex flex-col xl:flex-row gap-x-4">
      <div className="w-full px-1 lg:w-[17/20] mx-auto xl:w-[13/20] overflow-hidden">
        {activeSubSection.video ? (
          <>
            <VideoJS
              options={videoJsOptions}
              onComplete={handleVideoCompletion}
            />
            <div className="hidden xl:block mx-auto p-6 mt-6 mb-16 rounded-lg border border-gray-200 shadow-md">
              <h3 className="text-2xl font-semibold mb-4">
                Rate and Review the Course
              </h3>
              <ReviewFormModal onSubmit={handleReviewSubmit} />
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-[450px] text-red-600">
            <p className="text-lg font-semibold">
              No video available for this section.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Please check back later or try refreshing the page.
            </p>
          </div>
        )}
      </div>

      {/* Course Content Section */}
      <div className="w-full xl:w-1/3 rounded-lg overflow-y-auto">
        {activeCourse?.content && <Content content={activeCourse.content} />}
      </div>
      <div className="text-center xl:hidden mx-auto p-6 my-8  rounded-lg border border-gray-200 shadow-md">
        <h3 className="text-2xl font-semibold mb-4">
          Rate and Review the Course
        </h3>
        <ReviewFormModal onSubmit={handleReviewSubmit} />
      </div>
    </div>
  );
};

export default ViewCourseVideos;
