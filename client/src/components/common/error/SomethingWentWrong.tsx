import { useNavigate } from "react-router-dom";
import Error500 from "../../../assets/Images/Error500.png";

export const SomethingWentWrong: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center flex-col w-full h-[440px] lg:h-[580px] p-4">
      <img
        src={Error500}
        alt="Something Went Wrong"
        className="w-96 h-auto mb-4"
      />
      {/* <h2 className="text-2xl font-semibold mb-2">
        Oops! Something Went Wrong
      </h2> */}
      <p className="text-gray-600 text-center md:w-2/6 text-wrap">
        We encountered an unexpected error. Please try refreshing the page or
        click the button below to attempt again.
      </p>
      <button
        className="mt-6 px-6 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-500 transition"
        onClick={() => {
          navigate(0);
        }}
      >
        Try Again
      </button>
    </div>
  );
};
