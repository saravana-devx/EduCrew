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
    return response.data;
  },
  editCourse: async function (courseId: string, data: FormData) {
    const response: AxiosResponse = await api.request({
      url: CourseURL.editCourse + `/${courseId}`,
      method: "PATCH",
      headers: getHeaders(),
      data,
    });
    return response.data;
  },
  updateCourseStatus: async function (id: string, status: string) {
    const response: AxiosResponse = await api.request({
      url: CourseURL.updateCourseStatus + `/${id}`,
      method: "PATCH",
      headers: getHeaders(),
      data: { status },
    });
    return response.data;
  },
  deleteCourseByInstructor: async function (courseId: string) {
    const response: AxiosResponse = await api.request({
      url: CourseURL.deleteCourseByInstructor + `/${courseId}`,
      method: "POST",
      headers: getHeaders(),
    });
    return response.data;
  },
  deleteCourseByAdmin: async function (courseId: string) {
    const response: AxiosResponse = await api.request({
      url: CourseURL.deleteCourseByAdmin + `/${courseId}`,
      method: "POST",
      headers: getHeaders(),
    });
    return response.data;
  },

  getTopCourses: async function () {
    const response: AxiosResponse = await api.request({
      url: CourseURL.getTopCourses,
      method: "GET",
    });
    return response.data;
  },
  getCourseByPage: async function (limit : number, page : number) {
    const response: AxiosResponse = await api.request({
      url: `${CourseURL.getCourseByPage}?limit=${limit}&page=${page}`,
      method: "GET",
    });
    return response.data;
  },
  getCourseByCategory: async function (category: string) {
    const response: AxiosResponse = await api.request({
      url: CourseURL.getCourseByCategory + `/${category}`,
      method: "GET",
    });
    return response.data;
  },
  getSearchResult: async function (query: string) {
    const response: AxiosResponse = await api.request({
      url: CourseURL.getSearchResult + `/${query}`,
      method: "GET",
    });
    return response.data;
  },
  getCourseById: async function (courseId: string) {
    const response: AxiosResponse = await api.request({
      url: CourseURL.getCourseById + `/${courseId}`,
    });
    return response.data;
  },

  getCourseByProgress: async function () {
    const response: AxiosResponse = await api.request({
      url: CourseURL.getCourseByProgress,
      method: "GET",
      headers: getHeaders(),
    });
    return response.data;
  },

  updateProgress: async function (courseId: string, subSectionId: string) {
    const response: AxiosResponse = await api.request({
      url: CourseURL.updateCourseProgress + `/${courseId}/${subSectionId}`,
      method: "PATCH",
      headers: getHeaders(),
    });
    return response.data;
  },

  getEnrolledCourses: async function () {
    const response: AxiosResponse = await api.request({
      url: CourseURL.getEnrolledCourses,
      method: "GET",
      headers: getHeaders(),
    });
    return response.data;
  },
};
