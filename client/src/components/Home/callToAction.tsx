import React from "react";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <div className="bg-indigo-500 text-white py-12 px-8 w-full">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">Join Our Community!</h2>
        <p className="mb-6 text-lg">
          Sign up today and start your learning journey with us. Enjoy exclusive
          content, personalized learning paths, and connect with like-minded
          individuals!
        </p>
        <p className="mb-6 text-lg">
          Don't miss out on our latest courses, webinars, and special events.
          Join thousands of other learners who are expanding their skills and
          knowledge.
        </p>
        <div className="flex justify-center">
          <Link
            to="/signUp"
            className="bg-white text-blue-600 font-semibold py-4 px-8 rounded-full shadow hover:bg-gray-100 transition duration-200 text-lg"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
