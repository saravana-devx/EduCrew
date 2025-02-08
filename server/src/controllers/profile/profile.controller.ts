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
import mongoose from "mongoose";

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
    const instructor = await Instructor.findById(instructorId);
    if (!instructor) {
      throw new ApiError({
        status: HTTP_STATUS.BAD_REQUEST,
        message: "Instructor Not Found",
      });
    }
    const pipeline = [
      {
        $match: {
          instructor: new mongoose.Types.ObjectId(instructorId),
        },
      },
      {
        $project: {
          _id: 1,
          courseName: 1,
          price: 1,
          totalStudentsEnrolled: { $size: "$studentEnrolled" },
          status: 1,
        },
      },
      {
        $lookup: {
          from: "ratingandreviews",
          localField: "_id",
          foreignField: "course",
          as: "ratings",
        },
      },
      {
        $set: {
          averageRating: { $ifNull: [{ $avg: "$ratings.rating" }, 0] },
        },
      },
      {
        $unset: "ratings",
      },
    ];
    const courseData = await Course.aggregate(pipeline);
    if (!courseData) {
      throw new ApiError({
        status: HTTP_STATUS.BAD_REQUEST,
        message: "No Course Available",
      });
    }
    res.status(HTTP_STATUS.OK).json(
      new ApiResponse({
        status: HTTP_STATUS.OK,
        message: "Instructor Dashboard Details",
        data: {
          courses: courseData,
          totalEarnings: instructor.earnings,
        },
      })
    );
  }
);

export const getCoursesInfoForAdmin = asyncHandler(
  async (req: Request, res: Response) => {
    const pipeline = [
      {
        $lookup: {
          from: "users",
          localField: "instructor",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      {
        $unwind: {
          path: "$userInfo",
        },
      },
      {
        $project: {
          _id: 1,
          courseName: 1,
          instructor: {
            $concat: ["$userInfo.firstName", "$userInfo.lastName"],
          },
          price: 1,
          studentEnrolled: {
            $size: "$studentEnrolled",
          },
        },
      },
      { $unset: "userInfo" },

      {
        $lookup: {
          from: "ratingandreviews",
          localField: "_id",
          foreignField: "course",
          as: "ratings",
        },
      },
      {
        $set: {
          averageRating: {
            $ifNull: [{ $avg: "$ratings.rating" }, 0],
          },
        },
      },
      {
        $unset: "ratings",
      },
    ];

    const courses = await Course.aggregate(pipeline);
    res.status(HTTP_STATUS.OK).json(
      new ApiResponse({
        status: HTTP_STATUS.OK,
        message: "Admin Dashboard courses Details",
        data: { courses },
      })
    );
  }
);

export const getUsersInfoForAdmin = asyncHandler(
  async (req: Request, res: Response) => {
    const pipeline = [
      {
        $project: {
          name: {
            $concat: ["$firstName", "$lastName"],
          },
          email: 1,
          accountType: 1,
          isActive: 1,
        },
      },
    ];

    const users = await User.aggregate(pipeline);

    res.status(HTTP_STATUS.OK).json(
      new ApiResponse({
        status: HTTP_STATUS.OK,
        message: "Admin Dashboard Users Details",
        data: { users },
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
