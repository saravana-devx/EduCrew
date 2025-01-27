import { AxiosResponse } from "axios";
import api from "../config/axiosConfig";
import { ContactURL } from "../config/axiosUtils";

interface Contact {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

export const ContactAPI = {
  postQuery: async function (data: Contact) {
    const response: AxiosResponse = await api.request({
      url: ContactURL.postQuery,
      method: "POST",
      data,
    });
    console.log(response.data.query);
    return response.data;
  },
  deleteQueryById: async function (queryId: string) {
    const response: AxiosResponse = await api.request({
      url: `${ContactURL.deleteQuery}/${queryId}`,
      method: "POST",
    });
    return response.data;
  },
};
