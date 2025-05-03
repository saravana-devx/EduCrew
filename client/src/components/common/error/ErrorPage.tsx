import { useNavigate } from "react-router-dom";

import Error404 from "../../../assets/images/Error404.jpg";

type ErrorMessage = {
  image: string;
  link: string;
  description: string;
  errorMessage: string;
  buttonText: string;
};

const ErrorMessage: React.FC<ErrorMessage> = ({
  image,
  link,
  description,
  errorMessage,
  buttonText,
}) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center flex-col w-full h-[580px] p-4">
      <img src={image} alt="No Course Found" className="w-96 h-auto mb-4" />
      <h2 className="text-2xl font-semibold mb-2">{errorMessage}</h2>
      <p className="text-gray-600 text-center md:w-2/6 text-wrap">
        {description}
      </p>
      <button
        className="mt-6 px-6 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-500 transition"
        onClick={() => navigate(link)}
      >
        {buttonText}
      </button>
    </div>
  );
};

export const PageNotFoundError = () => {
  return (
    <ErrorMessage
      image={Error404}
      link="/home"
      description="The page you are looking for might have been removed or is temporarily unavailable."
      errorMessage="Page Not Found"
      buttonText="Return To Home Page"
    />
  );
};

export const CategoryCourseNotFoundError = () => {
  return (
    <ErrorMessage
      image={Error404}
      link="/"
      description="We couldn't find courses in the selected category. Check out other categories to continue learning."
      errorMessage="Course Not Found"
      buttonText="Explore Other Courses"
    />
  );
};

export const NoResultsForSearchError = () => {
  return (
    <ErrorMessage
      image={Error404}
      link="/"
      description="We couldn't find any courses matching your search criteria. Try searching with different keywords."
      errorMessage="No Results Found"
      buttonText="Explore Other Courses"
    />
  );
};

export const NoCreatedCoursesError = () => {
  return (
    <ErrorMessage
      image={Error404}
      link="/create-course"
      description="It seems like you haven't created any courses yet. Start building your first course and share your knowledge!"
      errorMessage="No Created Courses"
      buttonText="Create Course"
    />
  );
};

export const NoPurchasedCoursesError = () => {
  return (
    <ErrorMessage
      image={Error404}
      link="/courses"
      description="You haven't purchased any courses yet. Explore our catalog to find courses that match your interests."
      errorMessage="No Purchased Courses"
      buttonText="Explore Courses"
    />
  );
};

export const NoCourseFound = () => {
  return (
    <ErrorMessage
      image={Error404}
      link="/courses"
      description="We couldn’t find any courses that match your search. Please try again
        with different keywords or check out our popular courses below."
      errorMessage="Course Not Found"
      buttonText="Explore Courses"
    />
  );
};
