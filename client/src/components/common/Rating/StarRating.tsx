import React, { useState } from "react";

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange }) => {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`text-2xl cursor-pointer ${
            (hover || rating) >= star ? "text-yellow-400" : "text-gray-300"
          }`}
          onClick={() => onRatingChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(null)}
        >
          ★
        </button>
      ))}
    </div>
  );
};

export default StarRating;
