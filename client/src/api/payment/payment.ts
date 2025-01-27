import { AxiosResponse } from "axios";

import api from "../config/axiosConfig";
import { getHeaders, paymentUrl } from "../config/axiosUtils";

export const paymentAPI = {
  createCheckOutSession: async function (courseId: string) {
    const response: AxiosResponse = await api.request({
      url: paymentUrl.createCheckOutSession + `/${courseId}`,
      method: "POST",
      headers: getHeaders(),
    });
    return response.data;
  },

  purchaseCourse: async function (courseId: string) {
    const response: AxiosResponse = await api.request({
      url: paymentUrl.purchaseCourse + `/${courseId}`,
      method: "PATCH",
      headers: getHeaders(),
    });
    return response.data;
  },
};
