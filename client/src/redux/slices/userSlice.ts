import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

import { CourseProgress } from "../../utils/types";

export interface UserDetails {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  accountType: "Student" | "Instructor" | "Admin";
  image?: File | string;
  additionalDetails?: additionalDetails;
  courses?: [];
  enrolledCourses?: string[];
  isActive: boolean;
}

export interface additionalDetails {
  gender: string;
  dob: string;
  about: string;
  contactNumber: string;
}
export interface User {
  userDetails: UserDetails;
  loggedIn: boolean;
  token: string;
  loading: boolean;
  courseProgress: CourseProgress[];
}

interface SetCompletedVideoPayload {
  courseId: string;
  completedVideo: string;
  totalVideos?: number;
}

const initialState: User = {
  userDetails: {
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    accountType: "Student",
    additionalDetails: {
      gender: "",
      dob: "",
      about: "",
      contactNumber: "",
    },
    enrolledCourses: [],
    isActive: false,
    courses: [],
  },
  courseProgress: [],
  loggedIn: false,
  token: "",
  loading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserDetails>) => {
      console.log("action -> ", action.payload);
      state.userDetails = {
        ...action.payload,
      };
    },
    setUserDataNull: (state) => {
      state.userDetails = initialState.userDetails;
      state.courseProgress = initialState.courseProgress;
      state.loggedIn = false;
      state.token = "";
      state.loading = false;
    },

    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    addEnrolledCourse: (state, action: PayloadAction<string>) => {
      const courseId = action.payload;
      if (!state.userDetails.enrolledCourses?.includes(courseId)) {
        state.userDetails.enrolledCourses?.push(courseId);
      }
    },
    setCourseProgress: (state, action: PayloadAction<CourseProgress[]>) => {
      console.log("under course progress");
      console.log(action.payload);
      state.courseProgress = action.payload;
    },

    setCompletedVideo: (
      state,
      action: PayloadAction<SetCompletedVideoPayload>
    ) => {
      const { courseId, completedVideo } = action.payload;

      // Find the course progress object
      const course = state.courseProgress.find(
        (progress) => progress.courseId === courseId
      );

      if (course) {
        // If course exists, add the video to the completedVideos array (avoid duplicates)
        if (!course.completedVideos.includes(completedVideo)) {
          course.completedVideos.push(completedVideo);
        }
      } else {
        // If course does not exist, create a new entry
        state.courseProgress.push({
          courseId,
          completedVideos: [completedVideo],
        });
      }
    },
  },
});

export const {
  setUserData,
  setUserDataNull,
  setCourseProgress,
  setLoggedIn,
  setToken,
  setLoading,
  addEnrolledCourse,
  setCompletedVideo,
} = userSlice.actions;

export const getUserDetails = (state: RootState) => state.users.userDetails;
export const loggedInStatus = (state: RootState) => state.users.loggedIn;
export const getToken = (state: RootState) => state.users.token;
export const getLoading = (state: RootState) => state.users.loading;

export const getCourseProgress = (state: RootState) =>
  state.users.courseProgress;

export const getCompletedVideosByCourseId = (
  state: RootState,
  courseId: string
) => {
  const courseProgress = state.users.courseProgress;

  const course = courseProgress.find(
    (progress) => progress.courseId === courseId
  );
  return course?.completedVideos || [];
};

export default userSlice.reducer;
