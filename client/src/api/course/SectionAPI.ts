import { AxiosResponse } from "axios";
import api from "../config/axiosConfig";
import { SectionURL } from "../config/axiosUtils";

export const SectionAPI = {
  createSection: async function (courseId: string, newSection: string) {
    const response: AxiosResponse = await api.request({
      url: SectionURL.addSection + `/${courseId}`,
      method: "POST",
      data: { sectionName: newSection },
    });
    return response.data;
  },
  updateSection: async function (
    courseId: string,
    sectionId: string,
    sectionName: string
  ) {
    const response: AxiosResponse = await api.request({
      url: SectionURL.updateSection + `/${courseId}/${sectionId}`,
      method: "PATCH",
      data: { sectionName },
    });
    return response.data;
  },
  deleteSection: async function (courseId: string, sectionId: string) {
    const response: AxiosResponse = await api.request({
      url: SectionURL.deleteSection + `/${courseId}/${sectionId}`,
      method: "POST",
    });
    return response.data;
  },
};
