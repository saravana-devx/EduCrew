import { Request, Response } from "express";

import asyncHandler from "../../middlewares/asyncHandler";

import { ApiError } from "../../utils/apiResponseHandler/apiError";
import { ApiResponse } from "../../utils/apiResponseHandler/apiResponse";
import { HTTP_STATUS, RESPONSE_MESSAGES } from "../../utils/constant";
import uploadMediaToCloudinary from "../../utils/cloudinary/uploadMediaToCloudinary";

import User from "../../model/User";
import Course from "../../model/course";
import Profile from "../../model/profile";
import CourseProgress from "../../model/courseProgress";
import Contact from "../../model/contact";
import Student from "../../model/student";
import Instructor from "../../model/instructor";

export const getProfileDetails = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.currentUser.id;

    const userDetails = await User.findById(id)
      .select("-password -isVerified  -courses -createdAt -updatedAt")
      .exec();

    if (!userDetails) {
      throw new ApiError({
        status: HTTP_STATUS.NOT_FOUND,
        message: RESPONSE_MESSAGES.USERS.NOT_FOUND,
      });
    }

    res.status(HTTP_STATUS.OK).json(
      new ApiResponse({
        status: HTTP_STATUS.OK,
        message: RESPONSE_MESSAGES.USERS.FOUND,
        data: { userDetails },
      })
    );
  }
);

export const updateProfile = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.body || Object.keys(req.body).length === 0) {
      throw new ApiError({
        status: HTTP_STATUS.BAD_REQUEST,
        message: "No data provided for updating profile",
      });
    }

    const { firstName, lastName, gender, dob, about, contactNumber } = req.body;
    const user = req.currentUser;

    let imageUrl;
    if (req.file) {
      const response = await uploadMediaToCloudinary(req.file.path);
      imageUrl = response.secure_url;
    }
    const newProfileDetails = await User.findByIdAndUpdate(
      user.id,
      {
        $set: {
          firstName,
          lastName,
          image: imageUrl,
        },
      },
      { new: true }
    );

    await Profile.findByIdAndUpdate(
      newProfileDetails?.additionalDetails,
      {
        $set: {
          gender,
          dob,
          about,
          contactNumber,
        },
      },
      { new: true }
    );
    const updatedProfile = await User.findById(user.id)
      .select(
        "-password -isVerified -approve  -courseProgress  -createdAt -updatedAt"
      ) // Exclude the password field
      .populate("additionalDetails")
      .exec();

    res.status(HTTP_STATUS.OK).json(
      new ApiResponse({
        status: HTTP_STATUS.OK,
        message: RESPONSE_MESSAGES.USERS.UPDATED,
        data: { updatedProfile },
      })
    );
  }
);

export const getInstructorDashboard = asyncHandler(
  async (req: Request, res: Response) => {
    const instructorId = req.currentUser.id;

    const instructor = await Instructor.findById(instructorId)
      .populate({
        path: "courses",
        populate: {
          path: "ratingAndReview",
          select: "rating",
        },
      })
      .select("courses earnings");

    if (!instructor || !instructor.courses) {
      return res.status(HTTP_STATUS.NOT_FOUND).json(
        new ApiResponse({
          status: HTTP_STATUS.NOT_FOUND,
          message: "No courses found for the instructor",
        })
      );
    }

    const coursesWithAverageRating = instructor.courses.map((course: any) => {
      const ratings = course.ratingAndReview.map(
        (review: any) => review.rating
      );
      const averageRating =
        ratings.length > 0
          ? ratings.reduce((acc: number, rating: number) => acc + rating, 0) /
            ratings.length
          : null;

      return {
        ...course.toObject(),
        averageRating,
        totalStudentsEnrolled: course.studentEnrolled.length,
      };
    });

    // Send the response, including earnings
    res.status(HTTP_STATUS.OK).json(
      new ApiResponse({
        status: HTTP_STATUS.OK,
        message: "Instructor Dashboard Details",
        data: {
          courses: coursesWithAverageRating,
          totalEarnings: instructor.earnings,
        },
      })
    );
  }
);

export const getAdminDashboardDetails = asyncHandler(
  async (req: Request, res: Response) => {

    const allUsers = await User.find().select(
      "firstName lastName accountType email isActive id"
    );
    const allCourses = await Course.find().select(
      "courseName instructor studentEnrolled status id"
    );
    const allQuery = await Contact.find();

    const { instructors, students } = allUsers.reduce(
      (counts, user) => {
        if (user.accountType === "Instructor") {
          counts.instructors++;
        } else if (user.accountType === "Student") {
          counts.students++;
        }
        return counts;
      },
      { instructors: 0, students: 0 }
    );

    res.status(HTTP_STATUS.OK).json(
      new ApiResponse({
        status: HTTP_STATUS.OK,
        message: "Admin Dashboard Details",
        data: {
          users: allUsers,
          courses: allCourses,
          queries: allQuery,
          totalStudents: students,
          totalInstructors: instructors,
          totalCourses: allCourses.length,
        },
      })
    );
  }
);

export const deleteAccount = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.currentUser;

    const deletedAccount = await User.findByIdAndDelete(id);

    res.status(HTTP_STATUS.OK).json(
      new ApiResponse({
        status: HTTP_STATUS.OK,
        message: RESPONSE_MESSAGES.USERS.DELETED,
        data: { deletedAccount },
      })
    );
  }
);
