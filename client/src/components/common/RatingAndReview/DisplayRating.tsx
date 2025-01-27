import {
    MdOutlineStarBorder,
    MdOutlineStarHalf,
    MdOutlineStarPurple500,
  } from "react-icons/md";
  
  const STAR_COUNT = 5;
  
  const DisplayRating: React.FC<{ value: number }> = ({ value }) => {
    const stars = Array.from({ length: STAR_COUNT }, (_, index) => (
      <MdOutlineStarBorder key={index} className="text-yellow-300" />
    ));
  
    let i;
    for (i = 0; i < value; i++) {
      stars[i] = <MdOutlineStarPurple500 key={i} className="text-yellow-300" />;
    }
  
    if (value % 1 !== 0) {
      stars[i - 1] = (
        <MdOutlineStarHalf key={i - 1} className="text-yellow-300" />
      );
    }
  
    return <div className="flex my-2">{stars}</div>;
  };
  
  export default DisplayRating;
  