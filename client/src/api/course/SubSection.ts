import { AxiosResponse } from "axios";
import api from "../config/axiosConfig";
import { SubSectionURL } from "../config/axiosUtils";

export const SubSectionAPI = {
  createSubSection: async function (data: FormData, sectionId: string) {
    const response: AxiosResponse = await api.request({
      url: SubSectionURL.addSubSection + `/${sectionId}`,
      method: "POST",
      data,
    });
    return response.data;
  },

  updateSubSection: async function (
    data: FormData,
    sectionId: string,
    subSectionId: string
  ) {
    const response: AxiosResponse = await api.request({
      url: SubSectionURL.updateSubSection + `/${sectionId}/${subSectionId}`,
      method: "PATCH",
      data,
    });
    return response.data;
  },

  deleteSubSection: async function (sectionId: string, subSectionId: string) {
    const response: AxiosResponse = await api.request({
      url: SubSectionURL.deleteSubSection + `/${sectionId}/${subSectionId}`,
      method: "POST",
    });
    return response.data;
  },
};
