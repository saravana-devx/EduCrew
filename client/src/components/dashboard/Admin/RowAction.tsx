import { AxiosError } from "axios";
import React from "react";
import { toast } from "react-toastify";
import { Course, User } from "./ColumnDefinition";
import {
  deleteCourse,
  deleteUser,
} from "../../../redux/slices/AdminDashboardSlice";
import { useAppDispatch } from "../../../hooks/redux.hook";
import { Row, RowData } from "@tanstack/react-table";

type RowActionsProps = {
  row: Row<RowData>;
};

export const DeleteUserAccount: React.FC<RowActionsProps> = ({ row }) => {
  const rowData = row.original as User;
  const dispatch = useAppDispatch();
  const handleDelete = async (userId: string) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        // await CourseAPI.deleteCourseByInstructor(courseId);
        dispatch(deleteUser({ userId: userId }));
        toast.success("User Account deleted successfully");
      } catch (error: unknown) {
        if (error instanceof AxiosError && error.response?.status === 500) {
          toast.error("Failed to Delete Course");
        }
      }
    }
  };
  return (
    <div>
      <button
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-full transition-all duration-200 text-sm relative group"
        onClick={() => handleDelete(rowData._id)}
      >
        Delete
        <span className="hidden z-10 group-hover:block absolute left-0 top-full bg-gray-50 text-black p-1 rounded min-w-[100px]">
          Delete User Account
        </span>
      </button>
    </div>
  );
};

export const DeleteCourseByAdmin: React.FC<RowActionsProps> = ({ row }) => {
  const rowData = row.original as Course;
  const dispatch = useAppDispatch();

  const handleDelete = async (courseId: string) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        // await CourseAPI.deleteCourseByInstructor(courseId);
        dispatch(deleteCourse({ courseId: courseId }));
        toast.success("Course deleted successfully");
      } catch (error: unknown) {
        if (error instanceof AxiosError && error.response?.status === 500) {
          toast.error("Failed to Delete Course");
        }
      }
    }
  };
  return (
    <div>
      <button
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-full transition-all duration-200 text-sm relative group"
        onClick={() => handleDelete(rowData._id)}
      >
        Delete
        <span className="hidden z-10 group-hover:block absolute left-0 top-full bg-gray-50 text-black p-1 rounded min-w-[100px]">
          Delete Course
        </span>
      </button>
    </div>
  );
};
