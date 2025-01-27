import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-50">
      <h1 className="text-4xl font-bold text-green-600">
        Payment Successful! 
      </h1>
      <p className="mt-4 text-lg text-gray-700">
        Thank you for your purchase. Your course is now unlocked!
      </p>
      <button
        className="mt-6 px-6 py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-lg"
        onClick={() => navigate("/my-courses")}
      >
        My courses
      </button>
    </div>
  );
};

export default PaymentSuccess;
