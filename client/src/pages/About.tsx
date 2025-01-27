import React from "react";

import ReviewCard from "../components/common/RatingAndReview/ReviewCard";

import instructor1 from "../assets/images/instructor.png";
import instructor2 from "../assets/images/instructor2.png";
import instructor3 from "../assets/images/instructor3.png";
import missionImage from "../assets/images/about.png";

import { reviews } from "../utils/reviews";

const About: React.FC = () => {
  return (
    <div className="bg-gradient-to-b lg:bg-gradient-to-r from-indigo-500 to-indigo-400 text-white">
      {/* Hero Section */}
      <section className="py-20 text-center bg-opacity-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-6 fade-in">
            Welcome to BrainStorm
          </h1>
          <p className="text-xl leading-relaxed fade-in">
            Your ultimate platform for mastering new skills, whether you're
            learning or teaching. Join us to advance your career or share your
            expertise.
          </p>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-indigo-100 to-blue-200 text-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="fade-in">
              <h2 className="text-4xl font-bold mb-4">Our Mission</h2>
              <p className="text-xl leading-relaxed mb-4">
                At BrainStorm, our mission is to democratize education by
                empowering both learners and educators. We believe in the power
                of knowledge and strive to make learning accessible to everyone,
                everywhere.
              </p>
              <p className="text-xl leading-relaxed">
                Whether you're a student looking to acquire new skills or an
                instructor eager to share your knowledge, BrainStorm provides
                the tools and resources to help you succeed. Join our vibrant
                community today and embark on your learning or teaching journey
                with us!
              </p>
            </div>
            <div>
              <img
                src={missionImage}
                alt="Mission"
                className="w-full bg-none shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white text-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 fade-in">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center fade-in">
              <img
                src={instructor1}
                alt="CEO"
                className="mx-auto object-contain rounded-full w-48 h-48 mb-4 shadow-lg"
              />
              <h3 className="text-2xl font-semibold">John Doe</h3>
              <p className="text-lg leading-relaxed">CEO & Founder</p>
            </div>
            <div className="text-center fade-in">
              <img
                src={instructor2}
                alt="CTO"
                className="mx-auto object-contain rounded-full w-48 h-48 mb-4 shadow-lg"
              />
              <h3 className="text-2xl font-semibold">Jane Smith</h3>
              <p className="text-lg leading-relaxed">
                Chief Technology Officer
              </p>
            </div>
            <div className="text-center fade-in">
              <img
                src={instructor3}
                alt="COO"
                className="mx-auto object-contain rounded-full w-48 h-48 mb-4 shadow-lg"
              />
              <h3 className="text-2xl font-semibold">Emily Johnson</h3>
              <p className="text-lg leading-relaxed">Chief Operating Officer</p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-gradient-to-r from-indigo-100 to-blue-200 text-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="fade-in">
              <h2 className="text-4xl font-bold mb-4">Our Story</h2>
              <p className="text-xl leading-relaxed mb-4">
                BrainStorm was born out of a desire to create a learning
                environment where anyone can thrive—whether they are acquiring
                new skills or imparting knowledge. Since our inception, we've
                become a global community of students, instructors, and
                professionals dedicated to continuous learning and teaching.
              </p>
              <p className="text-xl leading-relaxed">
                What began as a small project has grown into a dynamic platform
                offering thousands of courses across various fields. We're proud
                to support educators and learners alike and are excited about
                the future of online education.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white text-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 fade-in">
            What Our Users Say
          </h2>
          <ReviewCard reviews={reviews} shouldScroll={false} />
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b lg:bg-gradient-to-r from-indigo-500 to-indigo-400 text-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-8 fade-in">
            Ready to Start Learning?
          </h2>
          <p className="text-xl leading-relaxed mb-8 fade-in">
            Join millions of learners around the world and take the next step in
            your educational journey with BrainStorm.
          </p>
          <a
            href="#"
            className="px-8 py-4 bg-white text-indigo-600 font-semibold rounded-lg shadow-lg hover:bg-gray-200 transition duration-300 fade-in"
          >
            Get Started Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
