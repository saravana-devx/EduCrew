import { Request, Response } from "express";

import asyncHandler from "../../middlewares/asyncHandler";

import { ApiError } from "../../utils/apiResponseHandler/apiError";
import { HTTP_STATUS, RESPONSE_MESSAGES } from "../../utils/constant";

import Contact from "../../model/contact";
import { ApiResponse } from "../../utils/apiResponseHandler/apiResponse";

export const postQuery = asyncHandler(async (req: Request, res: Response) => {
  const { firstName, lastName, email, phone, message } = req.body;

  if (!firstName || !lastName || !email || !phone || !message) {
    throw new ApiError({
      status: HTTP_STATUS.BAD_REQUEST,
      message: RESPONSE_MESSAGES.COMMON.REQUIRED_FIELDS,
    });
  }

  const newQuery = await Contact.create({
    firstName,
    lastName,
    email,
    phone,
    message,
  });

  res.status(HTTP_STATUS.CREATED).json({
    status: HTTP_STATUS.CREATED,
    message: "Query sent successfully",
    data: newQuery,
  });
});

export const deleteQuery = asyncHandler(async (req: Request, res: Response) => {
  const { queryId } = req.params;

  if (!queryId) {
    return res.status(400).json({
      status: "error",
      message: "Query ID is required",
    });
  }

  const deletedQuery = await Contact.findByIdAndDelete(queryId);

  if (!deletedQuery) {
    return res.status(404).json({
      status: "error",
      message: "Query not found",
    });
  }

  res.status(200).json({
    status: "success",
    message: "Query deleted successfully",
  });
});

