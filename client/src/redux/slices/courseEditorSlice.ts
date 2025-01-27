import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Section, SubSection } from "../../utils/types";

export interface Course {
  _id: string;
  courseName: string;
  description: string;
  instructor: string;
  thumbnail: File | null;
  price: number;
  whatYouWillLearn: string[];
  content: Section[];
  category: string;
  studentEnrolled?: string;
  ratingAndReview?: string;
  status: "Published" | "Draft";
  createdAt?: string;
  updatedAt?: string;
}

export interface CourseEditorState {
  activeCourse: Course | null;
  loading: boolean;
  step: number;
  isEdit: boolean;
}

const initialState: CourseEditorState = {
  activeCourse: null,
  loading: false,
  step: 1,
  isEdit: false,
};

export const courseEditorSlice = createSlice({
  name: "courseEditor",
  initialState,
  reducers: {
    setActiveCourse: (state, action: PayloadAction<Course>) => {
      state.activeCourse = action.payload;
      state.loading = false;
    },
    setIsEdit: (state, action: PayloadAction<boolean>) => {
      state.isEdit = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
      state.loading = false;
    },
    clearCourseData: (state) => {
      state.activeCourse = null;
      state.loading = false;
      state.step = 1;
    },
    addSection: (state, action: PayloadAction<Section>) => {
      if (state.activeCourse) {
        state.activeCourse.content?.push(action.payload);
      }
      state.loading = false;
    },
    updateSection: (
      state,
      action: PayloadAction<{
        sectionId: string;
        updatedSection: Partial<Section>;
      }>
    ) => {
      const section = state.activeCourse?.content?.find(
        (sec) => sec._id === action.payload.sectionId
      );
      if (section) {
        Object.assign(section, action.payload.updatedSection); // Update section properties
      }
      state.loading = false;
    },
    addSubsection: (
      state,
      action: PayloadAction<{ sectionId: string; subsection: SubSection }>
    ) => {
      const section = state.activeCourse?.content?.find(
        (section) => section._id === action.payload.sectionId
      );
      if (section) {
        if (!section.subSection) {
          section.subSection = [];
        }
        section.subSection.push(action.payload.subsection);
        // console.log("Updated subsections -> ", section.subSection);
      } else {
        console.error("Section not found for ID -> ", action.payload.sectionId);
      }
      state.loading = false;
    },
    updateSubsection: (
      state,
      action: PayloadAction<{
        sectionId: string;
        subsectionId: string;
        updatedSubsection: Partial<SubSection>;
      }>
    ) => {
      const section = state.activeCourse?.content?.find(
        (sec) => sec._id === action.payload.sectionId
      );
      if (section) {
        const subsection = section.subSection.find(
          (sub) => sub._id === action.payload.subsectionId
        );
        if (subsection) {
          Object.assign(subsection, action.payload.updatedSubsection); // Update subsection properties
        }
      }
      state.loading = false;
    },
    deleteSection: (state, action: PayloadAction<string>) => {
      console.log("delete section");
      if (state.activeCourse !== null) {
        state.activeCourse.content = state.activeCourse.content?.filter(
          (section) => section._id !== action.payload
        );
      }
      state.loading = false;
    },
    deleteSubsection: (
      state,
      action: PayloadAction<{ sectionId: string; subsectionId: string }>
    ) => {
      const section = state.activeCourse?.content?.find(
        (sec) => sec._id === action.payload.sectionId
      );
      if (section) {
        section.subSection = section.subSection.filter(
          (subSection) => subSection._id !== action.payload.subsectionId
        );
      }
      state.loading = false;
    },
  },
});

export const {
  setActiveCourse,
  setIsEdit,
  setLoading,
  setStep,
  clearCourseData,
  addSection,
  updateSection,
  addSubsection,
  updateSubsection,
  deleteSection,
  deleteSubsection,
} = courseEditorSlice.actions;

export const getCourseData = (state: { courseEditor: CourseEditorState }) =>
  state.courseEditor.activeCourse;

export const getLoadingState = (state: { courseEditor: CourseEditorState }) =>
  state.courseEditor.loading;

export const getCurrentStep = (state: { courseEditor: CourseEditorState }) =>
  state.courseEditor.step;

export const getEditStatus = (state: RootState) => state.courseEditor.isEdit;

export default courseEditorSlice.reducer;
