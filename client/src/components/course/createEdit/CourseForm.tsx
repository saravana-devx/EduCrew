import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useLocation, useNavigate } from "react-router-dom";

import {
  getCourseData,
  getLoadingState,
  setActiveCourse,
  setLoading,
  setStep,
} from "../../../redux/slices/courseEditorSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux.hook";
import { CourseAPI } from "../../../api/course/CourseAPI";
import Spinner from "../../common/spinner/Spinner";

export interface CourseFormData {
  _id: string;
  courseName: string;
  description: string;
  thumbnail: File | string | null;
  whatYouWillLearn: string[];
  price: number;
  category: string;
  status: "Draft" | "Published";
}

const BasicInformation: React.FC = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(getLoadingState);

  const [courseData, setCourseData] = useState<CourseFormData>({
    _id: "",
    courseName: "",
    description: "",
    thumbnail: "",
    whatYouWillLearn: [],
    price: 0,
    category: "",
    status: "Draft",
  });
  // what is the use of "courses" and "course" ? why i have made two separate variables ?
  // const courses = useAppSelector(getCourseData);
  // console.log("id -------------> ", courses);
  const course = useAppSelector(getCourseData);

  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (!course && location.pathname.includes("/edit-course")) {
      navigate("/instructor/dashboard", { replace: true });
    }
  }, [course, location, navigate]);

  useEffect(() => {
    if (course) {
      setCourseData((prevData) => ({
        ...prevData,
        _id: course._id,
        courseName: course.courseName,
        description: course.description,
        thumbnail: course.thumbnail,
        whatYouWillLearn: course.whatYouWillLearn || [],
        price: course.price,
        category: course.category,
        status: course.status,
      }));
    } else {
      setCourseData({
        _id: "",
        courseName: "",
        description: "",
        thumbnail: null,
        whatYouWillLearn: [],
        price: 0,
        category: "",
        status: "Draft",
      });
    }
  }, [course]);
  const [newWhatYouWillLearn, setNewWhatYouWillLearn] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCourseData((prevData) => ({
        ...prevData,
        thumbnail: file,
      }));
    }
  };

  const addWhatYouWillLearn = () => {
    if (newWhatYouWillLearn.trim() !== "") {
      setCourseData((prevData) => ({
        ...prevData,
        whatYouWillLearn: [...prevData.whatYouWillLearn, newWhatYouWillLearn],
      }));
      setNewWhatYouWillLearn("");
    }
  };

  const removeWhatYouWillLearn = (itemToRemove: string) => {
    setCourseData((prevData) => ({
      ...prevData,
      whatYouWillLearn: prevData.whatYouWillLearn.filter(
        (item) => item !== itemToRemove
      ),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!courseData.category) return toast.warn("Category is required.");
      if (!courseData.thumbnail) return toast.warn("Thumbnail is required.");
      if (courseData.whatYouWillLearn.length === 0)
        return toast.warn("At least one item is required.");

      dispatch(setLoading(true));
      const data = new FormData();
      data.append("courseName", courseData.courseName);
      data.append("description", courseData.description);
      data.append("price", courseData.price.toString());
      data.append(
        "whatYouWillLearn",
        JSON.stringify(courseData.whatYouWillLearn)
      );
      data.append("category", courseData.category);
      data.append("status", courseData.status || "Published");

      // Check if thumbnail is valid before appending
      if (courseData.thumbnail instanceof File) {
        data.append("image", courseData.thumbnail);
      } else if (typeof courseData.thumbnail === "string") {
        data.append("image", courseData.thumbnail);
      }

      if (courseData._id) {
        // If editing, call update
        const result = await CourseAPI.editCourse(courseData._id, data);
        toast.success("Course updated successfully!"); // Update toast message
        dispatch(setActiveCourse(result.data.editedCourse));
      } else {
        // If creating new, call create
        const result = await CourseAPI.createCourse(data);
        toast.success("Course created successfully!"); // Create toast message
        dispatch(setActiveCourse(result.data.course)); // Set active course in Redux
        dispatch(setStep(2));
      }

      dispatch(setStep(2)); // Move to the next step in the Form
    } catch (error: unknown) {
      console.log(error);
      if (courseData._id) {
        toast.error("Failed to update course.");
      } else {
        toast.error("Failed to create course.");
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {loading && <Spinner />}
      <div className="bg-indigo-50 border border-indigo-200 shadow-lg rounded-lg p-6 h-full flex flex-col md:p-10">
        <div className="flex flex-col gap-y-8">
          <div className="flex flex-col md:flex-row justify-between gap-x-8">
            <div className="w-full md:w-1/2 space-y-6">
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-700">
                  Course Name
                </label>
                <input
                  className="w-full bg-indigo-50 px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300 focus:border-indigo-500 transition-all"
                  type="text"
                  name="courseName"
                  value={courseData.courseName}
                  onChange={handleInputChange}
                  placeholder="Course Name"
                  required
                />
              </div>

              {/* Price */}
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  className="w-full px-4 py-2 mt-2 bg-indigo-50 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300 focus:border-indigo-500 transition-all"
                  type="number"
                  name="price"
                  value={courseData.price}
                  onChange={handleInputChange}
                  placeholder="Price"
                  required
                />
              </div>

              {/* Select Category */}
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-700">
                  Select Category
                </label>
                <select
                  name="category"
                  id="category"
                  value={courseData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 mt-2 bg-indigo-50 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300 focus:border-indigo-500 transition-all"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Personal Development">
                    Personal Development
                  </option>
                  <option value="Technology">Technology</option>
                  <option value="Business">Business</option>
                  <option value="Design">Design</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Finance">Finance</option>
                </select>
              </div>

              {/* Description */}
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="w-full h-52 px-4 py-2 mt-2 bg-indigo-50 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300 focus:border-indigo-500 transition-all"
                  placeholder="Enter short Description"
                  value={courseData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            {/* Thumbnail and Learning Points */}
            <div className="md:w-1/2">
              {/* Thumbnail Input */}
              {
                <div className="relative w-full max-w-lg mx-auto mb-8 border border-gray-300 rounded-lg overflow-hidden shadow-md h-44 sm:h-56 md:h-72">
                  {courseData.thumbnail ? (
                    <>
                      <img
                        className="object-cover w-full h-full"
                        src={
                          typeof courseData.thumbnail === "string"
                            ? courseData.thumbnail
                            : URL.createObjectURL(courseData.thumbnail)
                        }
                        alt="Course Thumbnail"
                      />
                      <div className="absolute inset-0 bg-black opacity-30 flex items-center justify-center">
                        <label className="text-white text-lg">
                          Change Thumbnail
                        </label>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <label className="text-gray-400">Upload Thumbnail</label>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              }

              {/* Learning Points */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  What You Will Learn
                </label>
                <div className="flex flex-col gap-2 mt-2">
                  {courseData.whatYouWillLearn.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-indigo-50 border border-gray-300 rounded-md p-2"
                    >
                      <span>{item}</span>
                      <button
                        type="button"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => removeWhatYouWillLearn(item)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newWhatYouWillLearn}
                      onChange={(e) => setNewWhatYouWillLearn(e.target.value)}
                      placeholder="Add a new learning point"
                      className="flex-grow px-4 py-2 bg-indigo-50 border border-gray-300 rounded-md"
                    />
                    <button
                      type="button"
                      className="bg-indigo-600 text-white rounded-md px-4 py-2"
                      onClick={addWhatYouWillLearn}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit and Update Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-indigo-600 text-white rounded-md px-4 py-2 mr-2"
            >
              {courseData._id ? "Update Course" : "Submit Course"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default BasicInformation;
