import { AxiosResponse } from "axios";
import api from "../config/axiosConfig";
import { AuthURL, getHeaders } from "../config/axiosUtils";

type signUPData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  accountType: "Student" | "Instructor";
};

export const AuthAPI = {
  registerUser: async function (data: signUPData) {
    const response: AxiosResponse = await api.request({
      url: AuthURL.registerUser,
      method: "POST",
      data,
    });
    return response.data;
  },
  login: async function (email: string, password: string) {
    const response: AxiosResponse = await api.request({
      url: AuthURL.loginUser,
      method: "POST",
      data: { email, password },
    });
    return response.data;
  },
  ConfirmEmail: async function (token: string | null) {
    const response: AxiosResponse = await api.request({
      url: AuthURL.confirmEmail + `?token=${token}`,
      method: "POST",
    });
    return response.data;
  },
  changePassword: async function (
    oldPassword: string,
    newPassword: string,
    confirmPassword: string
  ) {
    const response: AxiosResponse = await api.request({
      url: AuthURL.changePassword,
      method: "PATCH",
      headers: getHeaders(),
      data: {
        oldPassword,
        newPassword,
        confirmPassword,
      },
    });
    return response.data;
  },
  forgetPassword: async function (email: string) {
    const response: AxiosResponse = await api.request({
      url: AuthURL.forgotPassword,
      method: "POST",
      data: { email },
    });
    return response.data;
  },
  resetForgetPassword: async function (
    newPassword: string,
    confirmPassword: string,
    token: string
  ) {
    const response: AxiosResponse = await api.request({
      url: AuthURL.resetPassword + `?token=${token}`,
      method: "PATCH",
      data: {
        newPassword,
        confirmPassword,
      },
    });
    return response.data;
  },
  toggleUserActiveStatus: async function (userId: string, isActive: boolean) {
    const response: AxiosResponse = await api.request({
      url: AuthURL.toggleUserActiveStatus,
      method: "POST",
      headers: getHeaders(),
      data: {
        userId,
        isActive,
      },
    });
    return response.data;
  },
};
