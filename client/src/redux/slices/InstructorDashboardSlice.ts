import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Course {
  _id: string;
  courseName: string;
  price: number;
  averageRating: number;
  status: string;
  totalStudentsEnrolled: number;
}

export interface InstructorDashboardState {
  courses: Course[];
  totalEarnings: number;
}

const initialState: InstructorDashboardState = {
  courses: [],
  totalEarnings: 0,
};

export const instructorDashboardSlice = createSlice({
  name: "instructorDashboard",
  initialState,
  reducers: {
    setInstructorDashboard: (
      state,
      action: PayloadAction<InstructorDashboardState>
    ) => {
      state.courses = action.payload.courses;
      state.totalEarnings = action.payload.totalEarnings;
    },
    changeCourseStatus: (
      state,
      action: PayloadAction<{ status: string; courseId: string }>
    ) => {
      const course = state.courses.find(
        (course) => course._id === action.payload.courseId
      );
      if (course) {
        course.status = action.payload.status;
      }
    },
  },
});

export const getInstructorDashboard = (state: {
  instructorDashboard: InstructorDashboardState;
}) => state.instructorDashboard;

export const { setInstructorDashboard, changeCourseStatus } =
  instructorDashboardSlice.actions;
export default instructorDashboardSlice.reducer;
