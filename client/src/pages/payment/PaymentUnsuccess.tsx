import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentUnsuccess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <h1 className="text-4xl font-bold text-red-600">
        Payment Unsuccessful 
      </h1>
      <p className="mt-4 text-lg text-gray-700">
        Your payment could not be processed. Please try again.
      </p>
      <button
        className="mt-6 px-6 py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-lg"
        onClick={() => navigate(-1)}
      >
        Return to Course
      </button>
    </div>
  );
};

export default PaymentUnsuccess;
