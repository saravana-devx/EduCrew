import React, { useState } from "react";
import StarRating from "./StarRating"; // Adjust this path if needed
import { toast } from "react-toastify";

interface ReviewFormModalProps {
  onSubmit: (rating: number, review: string) => void;
}

const ReviewFormModal: React.FC<ReviewFormModalProps> = ({ onSubmit }) => {
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.warn("Please provide a rating");
      return;
    }
    onSubmit(rating, review);
    setRating(0);
    setReview("");
    setShowModal(false);
    toast.success("Review added Successfully");
  };

  return (
    <>
      {/* Button to open the modal */}
      <button
        onClick={() => setShowModal(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Write a Review
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed p-4 lg:p-0 inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h3 className="text-2xl font-semibold mb-4">
              Rate and Review this Course
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-lg font-semibold">
                  Rate this course:
                </label>
                <StarRating rating={rating} onRatingChange={setRating} />
              </div>
              <div>
                <label className="text-lg font-semibold">Leave a review:</label>
                <textarea
                  className="w-full p-2 mt-2 border rounded-md"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Write your review here"
                  rows={4}
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewFormModal;
