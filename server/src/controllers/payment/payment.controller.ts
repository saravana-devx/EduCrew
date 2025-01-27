import { Request, Response } from "express";
import mongoose, { ObjectId } from "mongoose";

import asyncHandler from "../../middlewares/asyncHandler";

import { ApiError } from "../../utils/apiResponseHandler/apiError";
import { ApiResponse } from "../../utils/apiResponseHandler/apiResponse";
import { HTTP_STATUS, RESPONSE_MESSAGES } from "../../utils/constant";
import mailSender from "../../utils/email/mailSender";

import Student from "../../model/student";
import Course from "../../model/course";

import path from "path";
import fs from "fs";
import Stripe from "stripe";
import Instructor from "../../model/instructor";

export const createCheckOutSession = async (req: Request, res: Response) => {
  const { courseId } = req.params;
  const userId = req.currentUser.id;
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!courseId) {
    throw new ApiError({
      status: HTTP_STATUS.BAD_REQUEST,
      message: "Course ID is required",
    });
  }

  const course = await Course.findById(courseId);
  if (!course) {
    throw new ApiError({
      status: HTTP_STATUS.NOT_FOUND,
      message: RESPONSE_MESSAGES.COURSES.NOT_FOUND,
    });
  }

  const student = await Student.findById(userId);
  if (!student) {
    throw new ApiError({
      status: HTTP_STATUS.NOT_FOUND,
      message: "Student not found",
    });
  }

  if (student.enrolledCourses.length < 0) {
    throw new ApiError({
      status: HTTP_STATUS.FORBIDDEN,
      message: "You're already enrolled in this course",
    });
  }

  if (!secretKey) {
    throw new Error(
      "Stripe secret key is not defined in environment variables."
    );
  }

  const stripe = new Stripe(secretKey);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: course.courseName,
            images: [course.thumbnail],
          },
          unit_amount: Math.round(course.price * 100),
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.FRONTEND_URL}/payment-success`,
    cancel_url: `${process.env.FRONTEND_URL}/payment-unsuccess`,
  });

  res.status(HTTP_STATUS.OK).json(
    new ApiResponse({
      status: HTTP_STATUS.OK,
      message: "Checkout session created successfully",
      data: { id: session.id },
    })
  );
};

export const purchaseCourse = asyncHandler(
  async (req: Request, res: Response) => {
    const { id, email } = req.currentUser;
    const { courseId } = req.params;

    const course = await Course.findById(courseId);

    if (!course) {
      throw new ApiError({
        status: HTTP_STATUS.NOT_FOUND,
        message: RESPONSE_MESSAGES.COMMON.REQUIRED_FIELDS,
      });
    }

    const enrolledInCourse = await Student.findByIdAndUpdate(
      id,
      {
        $push: { enrolledCourses: courseId },
      },
      { new: true }
    );

    // add student id in studentEnrolled array in course
    const studentEnrolled = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          studentEnrolled: id,
        },
      },
      { new: true }
    );
    await Instructor.findByIdAndUpdate(
      course.instructor,
      {
        $inc: {
          earnings: course.price,
        },
      },
      { new: true }
    );

    const templatePath = path.join(
      __dirname,
      "..",
      "utils",
      "templates",
      "PurchasedCourse.html"
    );

    let emailHtml = fs.readFileSync(templatePath, "utf8");
    // Replace all occurrences of {{verificationLink}} with the actual verification link
    emailHtml = emailHtml.replace(/{{courseName}}/g, course.courseName);

    await mailSender(email, "Generate a new password", emailHtml);

    res.status(HTTP_STATUS.OK).json(
      new ApiResponse({
        status: HTTP_STATUS.OK,
        message: "Course purchased successfully",
        data: {
          enrolledInCourse,
          studentEnrolled,
        },
      })
    );
  }
);
