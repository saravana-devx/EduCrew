import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ratingAndReview, Section, SubSection } from "../../utils/types";

export interface UserDetails {
  _id: string;
  firstName: string;
  lastName: string;
  image: string;
}

export interface Course {
  _id: string;
  courseName: string;
  description: string;
  instructor: UserDetails;
  thumbnail: string;
  price: number;
  whatYouWillLearn: string[];
  content: Section[];
  category: string;
  studentEnrolled?: [];
  ratingAndReview: ratingAndReview[];
  status: "Published" | "Draft";
  createdAt: string;
  updatedAt: string;
}

export interface CourseDetailState {
  courses: Course[];
  activeCourse: Course | null;
  activeSubSection: SubSection;
  loading: boolean;
  topCourses: Course[];
  searchResults: Course[];
}

const initialDetailState: CourseDetailState = {
  courses: [],
  searchResults: [],
  activeCourse: null,
  activeSubSection: {
    _id: "",
    sectionId: "",
    title: "",
    description: "",
    video: "",
  },
  loading: false,
  topCourses: [],
};

export const courseDetailSlice = createSlice({
  name: "courseDetail",
  initialState: initialDetailState,
  reducers: {
    setTopCourses: (state, action: PayloadAction<Course[]>) => {
      state.topCourses = action.payload;
      state.loading = false;
    },
    setCourses: (state, action: PayloadAction<Course[]>) => {
      state.courses = action.payload;
      state.loading = false;
    },
    setSearchResults: (state, action: PayloadAction<Course[]>) => {
      state.searchResults = action.payload;
      state.loading = false;
    },
    setActiveCourse: (state, action: PayloadAction<Course | null>) => {
      state.activeCourse = action.payload;
      state.loading = false;
    },
    setActiveSubSection: (state, action: PayloadAction<SubSection>) => {
      state.activeSubSection = action.payload;
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setTopCourses,
  setCourses,
  setActiveCourse,
  setActiveSubSection,
  setLoading,
  setSearchResults,
} = courseDetailSlice.actions;

export const getTopCourses = (state: { courseDetail: CourseDetailState }) =>
  state.courseDetail.topCourses;
export const getCourses = (state: { courseDetail: CourseDetailState }) =>
  state.courseDetail.courses;
export const getSearchResults = (state: { courseDetail: CourseDetailState }) =>
  state.courseDetail.searchResults;
export const getActiveCourse = (state: { courseDetail: CourseDetailState }) =>
  state.courseDetail.activeCourse;
export const getActiveSubSection = (state: {
  courseDetail: CourseDetailState;
}) => {
  return state.courseDetail.activeSubSection;
};
export const getLoading = (state: { courseDetail: CourseDetailState }) =>
  state.courseDetail.loading;

export default courseDetailSlice.reducer;
