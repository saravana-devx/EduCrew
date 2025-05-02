import { AxiosResponse } from "axios";
import api from "../config/axiosConfig";
import { getHeaders, ProfileURL } from "../config/axiosUtils";

export const ProfileAPI = {
  profileDetails: async function () {
    const response: AxiosResponse = await api.request({
      url: ProfileURL.profileDetails,
      method: "GET",
      headers: getHeaders(),
    });
    return response.data;
  },
  updateProfile: async function (formData: FormData) {
    const response: AxiosResponse = await api.request({
      url: ProfileURL.updateProfile,
      method: "PUT",
      headers: getHeaders(),
      data: formData,
    });
    return response.data;
  },
  deleteAccount: async function () {
    const response: AxiosResponse = await api.request({
      url: ProfileURL.deleteAccount,
      method: "DELETE",
      headers: getHeaders(),
    });
    return response.data;
  },
  getInstructorDashboardData: async function () {
    const response: AxiosResponse = await api.request({
      url: ProfileURL.getInstructorDashboardData,
      method: "GET",
      headers: getHeaders(),
    });
    return response.data;
  },
  getAdminDashboardData: async function () {
    const response: AxiosResponse = await api.request({
      url: ProfileURL.getAdminDashboardData,
      method: "GET",
      headers: getHeaders(),
    });
    return response.data;
  },
  getCoursesInfoForAdmin: async function () {
    const response: AxiosResponse = await api.request({
      url: ProfileURL.getCoursesInfoForAdmin,
      method: "GET",
      headers: getHeaders(),
    });
    return response.data;
  },
  getUsersInfoForAdmin: async function () {
    const response: AxiosResponse = await api.request({
      url: ProfileURL.getUsersInfoForAdmin,
      method: "GET",
      headers: getHeaders(),
    });
    return response.data;
  },
  deleteAccountByAdmin: async function (userId: string) {
    const response: AxiosResponse = await api.request({
      url: ProfileURL.deleteAccountByAdmin + `/${userId}`,
      method: "DELETE",
    });
    return response.data;
  },
  getEarningsByMonth: async function () {
    const response: AxiosResponse = await api.request({
      url: ProfileURL.getEarningsByMonth,
      method: "GET",
      headers: getHeaders(),
    });
    return response.data;
  },
  getEarningByCourse: async function () {
    const response: AxiosResponse = await api.request({
      url: ProfileURL.getEarningByCourse,
      method: "GET",
      headers: getHeaders(),
    });
    return response.data;
  },
  getMostEnrolledCourses: async function () {
    const response: AxiosResponse = await api.request({
      url: ProfileURL.getMostEnrolledCourses,
      method: "GET",
      headers: getHeaders(),
    });
    return response.data;
  },
  getTotalUsersByStatus: async function () {
    const response: AxiosResponse = await api.request({
      url: ProfileURL.getTotalUsersByStatus,
      method: "GET",
      headers: getHeaders(),
    });
    return response.data;
  },
};
