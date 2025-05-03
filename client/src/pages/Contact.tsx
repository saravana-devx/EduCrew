import React, { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { toast } from "react-toastify";

import contactImage from "../assets/images/contact.jpg";
import { ContactAPI } from "../api/contact/ContactAPI";

interface Query {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

const ContactPage = () => {
  const [formData, setFormData] = useState<Query>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { firstName, lastName, email, phone, message } = formData;

    // Validate form data
    if (!firstName || !lastName || !email || !phone || !message) {
      toast.error("Please fill in all fields.");
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      toast.error("Please enter a valid phone number.");
      return;
    }

    try {
      await ContactAPI.postQuery(formData);

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
      toast.success("Query send successfully.");
    } catch (error) {
      toast.error("Failed to send your query. Please try again.");
      console.error("Error sending query:", error);
    }
  };

  return (
    <div className="bg-gray-100 text-gray-800">
      {/* Hero Section */}
      <section className="py-20 text-center bg-indigo-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-6 fade-in">
            Get in Touch with Us
          </h1>
          <p className="text-xl leading-relaxed fade-in">
            We are here to help you with any queries or support you need.
          </p>
        </div>
      </section>

      {/* Contact Us Form Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Contact Image */}
            <div className="fade-in">
              <img
                src={contactImage}
                alt="Contact Us"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-lg p-8 fade-in">
              <h2 className="text-4xl font-bold text-center text-indigo-500 mb-8">
                Contact Us
              </h2>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName" // Update name to match state
                      value={formData.firstName}
                      onChange={handleChange}
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName" // Update name to match state
                      value={formData.lastName}
                      onChange={handleChange}
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    inputMode="numeric" // Set input mode to numeric
                    pattern="[0-9]*" // Allows numeric input
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Your Query
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  ></textarea>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-indigo-500 text-white rounded-md text-sm uppercase shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-150 ease-in-out"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Our Location Section */}
      <section className="py-16 bg-indigo-500 text-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-8 fade-in">Visit Our Office</h2>
          <p className="text-xl leading-relaxed mb-8 fade-in">
            We are located in the heart of the city. Feel free to drop by and
            say hello!
          </p>
          <div className="mt-10 fade-in">
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-16 bg-white text-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-6">
            Contact Information
          </h2>
          <div className="flex justify-center space-x-8">
            <div className="flex items-center space-x-2">
              <FaMapMarkerAlt className="text-indigo-500 text-2xl" />
              <p>1234 Street Name, City, State</p>
            </div>
            <div className="flex items-center space-x-2">
              <FaEnvelope className="text-indigo-500 text-2xl" />
              <p>educrew1234@gmail.com</p>
            </div>
            <div className="flex items-center space-x-2">
              <FaPhone className="text-indigo-500 text-2xl" />
              <p>(123) 456-7890</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
