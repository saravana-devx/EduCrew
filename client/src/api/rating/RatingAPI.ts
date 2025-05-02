import { AxiosResponse } from "axios";

import api from "../config/axiosConfig";
import { getHeaders, RatingURL } from "../config/axiosUtils";

export const RatingAndReviewAPI = {
  createRatingAndReview: async function (
    courseId: string,
    rating: number,
    review: string
  ) {
    const response: AxiosResponse = await api.request({
      url: RatingURL.createRatingAndReview + `/${courseId}`,
      method: "POST",
      data: {
        rating,
        review,
      },
      headers: getHeaders(),
    });
    return response.data;
  },

  getAverageRating: async function (courseId: string) {
    const response: AxiosResponse = await api.request({
      url: RatingURL.getAverageRating + `/${courseId}`,
      method: "GET",
    });
    return response.data;
  },

  getAllRatingByCourse: async function (courseId: string) {
    const response: AxiosResponse = await api.request({
      url: RatingURL.getAllRatingByCourse + "/" + courseId,
      method: "GET",
    });
    return response.data;
  },
};
