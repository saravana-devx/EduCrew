// import { Course } from "../../utils/types";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Course {
  _id: string;
  courseName: string;
  instructor: string;
  price: number;
  averageRating: number;
  studentEnrolled: number;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  accountType: "Instructor" | "Student" | "Admin";
  isActive: boolean;
}

export interface AdminDashboardState {
  courses: Course[];
  users: User[];
}

const initialState: AdminDashboardState = {
  courses: [],
  users: [],
};

export const AdminDashboardSlice = createSlice({
  name: "adminDashboard",
  initialState,
  reducers: {
    setCourses: (state, action: PayloadAction<Course[]>) => {
      state.courses = action.payload;
    },
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    deleteCourse: (state, action: PayloadAction<{ courseId: string }>) => {
      state.courses = state.courses.filter(
        (course) => course._id !== action.payload.courseId
      );
    },
    deleteUser: (state, action: PayloadAction<{ userId: string }>) => {
      state.users = state.users.filter(
        (user) => user._id !== action.payload.userId
      );
    },
  },
});

export const getCourses = (state: { adminDashboard: AdminDashboardState }) =>
  state.adminDashboard.courses;
// export const getUsers = (state: { users: User[] }) => state.users;
export const getUsers = (state: { adminDashboard: AdminDashboardState }) =>
  state.adminDashboard.users;

export const { setCourses, setUsers, deleteCourse, deleteUser } =
  AdminDashboardSlice.actions;

export default AdminDashboardSlice.reducer;
