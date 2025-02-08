import { AxiosResponse } from "axios";
import api from "../config/axiosConfig";
import { CourseURL, getHeaders } from "../config/axiosUtils";

export const CourseAPI = {
  createCourse: async function (formData: FormData) {
    const response: AxiosResponse = await api.request({
      url: CourseURL.createCourse,
      method: "POST",
      headers: getHeaders(),
      data: formData,
    });
    console.log(response.data);
    return response.data;
  },
  editCourse: async function (courseId: string, data: FormData) {
    const response: AxiosResponse = await api.request({
      url: CourseURL.editCourse + `/${courseId}`,
      method: "PATCH",
      headers: getHeaders(),
      data,
    });
    console.log(response.data);
    return response.data;
  },
  updateCourseStatus: async function (id: string, status: string) {
    const response: AxiosResponse = await api.request({
      url: CourseURL.updateCourseStatus + `/${id}`,
      method: "PATCH",
      headers: getHeaders(),
      data: { status },
    });
    console.log(response.data);
    return response.data;
  },
  deleteCourseByInstructor: async function (courseId: string) {
    const response: AxiosResponse = await api.request({
      url: CourseURL.deleteCourseByInstructor + `/${courseId}`,
      method: "POST",
      headers: getHeaders(),
    });
    console.log(response.data);
    return response.data;
  },
  deleteCourseByAdmin: async function (courseId: string) {
    const response: AxiosResponse = await api.request({
      url: CourseURL.deleteCourseByAdmin + `/${courseId}`,
      method: "POST",
      headers: getHeaders(),
    });
    console.log(response.data);
    return response.data;
  },

  getTopCourses: async function () {
    const response: AxiosResponse = await api.request({
      url: CourseURL.getTopCourses,
      method: "GET",
    });
    console.log(response.data);
    return response.data;
  },
  getAllCourses: async function () {
    const response: AxiosResponse = await api.request({
      url: CourseURL.getAllCourses,
      method: "GET",
    });
    console.log(response.data);
    return response.data;
  },
  getCourseByCategory: async function (category: string) {
    const response: AxiosResponse = await api.request({
      url: CourseURL.getCourseByCategory + `/${category}`,
      method: "GET",
    });
    console.log(response.data);
    return response.data;
  },
  getSearchResult: async function (query: string) {
    console.log("query ->  ", query);
    const response: AxiosResponse = await api.request({
      url: CourseURL.getSearchResult + `/${query}`,
      method: "GET",
    });
    console.log("loo -> ", response.data);
    return response.data;
  },
  getCourseById: async function (courseId: string) {
    const response: AxiosResponse = await api.request({
      url: CourseURL.getCourseById + `/${courseId}`,
    });
    console.log(response.data);
    return response.data;
  },

  getCourseByProgress: async function () {
    const response: AxiosResponse = await api.request({
      url: CourseURL.getCourseByProgress,
      method: "GET",
      headers: getHeaders(),
    });
    console.log(response.data);
    return response.data;
  },

  updateProgress: async function (courseId: string, subSectionId: string) {
    const response: AxiosResponse = await api.request({
      url: CourseURL.updateCourseProgress + `/${courseId}/${subSectionId}`,
      method: "PATCH",
      headers: getHeaders(),
    });
    console.log(response.data);
    return response.data;
  },

  getEnrolledCourses: async function (courseId: string) {
    const response: AxiosResponse = await api.request({
      url: CourseURL.getEnrolledCourses + `/${courseId}`,
      method: "GET",
      headers: getHeaders(),
    });
    return response.data;
  },
};
