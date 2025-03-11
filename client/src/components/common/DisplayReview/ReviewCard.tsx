import React from "react";
import { ratingAndReview } from "../../../utils/types";
import DisplayRating from "./DisplayRating";
import Marquee from "react-fast-marquee";


interface ReviewProps {
  reviews: ratingAndReview[];
  shouldScroll: boolean;
}

const ReviewList: React.FC<ReviewProps> = ({ reviews, shouldScroll }) => {
  
  return (
    <div
      className={`gap-6 py-12 mx-auto px-4 sm:px-6 lg:px-8 ${
        shouldScroll
          ? "flex flex-nowrap overflow-x-auto"
          : "grid sm:grid-cols-2 lg:grid-cols-3 max-w-7xl"
      }`}
    >
      {reviews.map((review: ratingAndReview, index: number) => (
        <div
          key={index}
          className={`bg-white rounded-lg shadow-md p-6 ${
            shouldScroll && "w-96"
          }`}
        >
          <div className="flex items-center mb-4">
            <img
              className="w-22 h-11 rounded-full object-contain"
              src={review.user.image}
              alt={review.user.firstName}
            />
            <div className="ml-4 flex flex-col justify-start items-start">
              <h4 className="text-lg font-bold text-gray-900">
                {review.user.firstName} {review.user.lastName}
              </h4>
              <p className="text-sm text-gray-600">Student</p>
            </div>
          </div>
          <p className="text-gray-700 text-sm">“{review.review}”</p>
          <div className="flex items-center justify-center">
            <DisplayRating value={review.rating} />
          </div>
        </div>
      ))}
    </div>
  );
};

const ReviewCard: React.FC<ReviewProps> = ({ reviews, shouldScroll }) => {
  return (
    <div>
      {shouldScroll ? (
        <Marquee
          gradient={false}
          pauseOnHover={true}
          className="overflow-hidden flex justify-start text-indigo-500"
        >
          <ReviewList reviews={reviews} shouldScroll={shouldScroll} />
        </Marquee>
      ) : (
        <ReviewList reviews={reviews} shouldScroll={shouldScroll} />
      )}
    </div>
  );
};

export default ReviewCard;
