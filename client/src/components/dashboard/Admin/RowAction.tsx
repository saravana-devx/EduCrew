import { AxiosError } from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Course, User } from "./ColumnDefinition";
import {
  deleteCourse,
  deleteUser,
} from "../../../redux/slices/AdminDashboardSlice";
import { useAppDispatch } from "../../../hooks/redux.hook";
import { Row, RowData } from "@tanstack/react-table";
import { CourseAPI } from "../../../api/course/CourseAPI";
import { ProfileAPI } from "../../../api/auth/ProfileAPI";
import ConfirmDeleteModal from "../../common/modal/DeleteModal";

type RowActionsProps = {
  row: Row<RowData>;
};

export const DeleteUserAccount: React.FC<RowActionsProps> = ({ row }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const rowData = row.original as User;
  const dispatch = useAppDispatch();
  const handleAccountDelete = async (userId: string) => {
    try {
      await ProfileAPI.deleteAccountByAdmin(userId);
      dispatch(deleteUser({ userId: userId }));
      toast.success("User Account deleted successfully");
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response?.status === 500) {
        toast.error("Failed to Delete Course");
      }
    }
  };
  return (
    <div>
      <button
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-full transition-all duration-200 text-sm relative group"
        onClick={() => {
          setSelectedId(rowData._id);
          setModalOpen(true);
        }}
      >
        Delete
        <span className="hidden z-10 group-hover:block absolute left-0 top-full bg-gray-50 text-black p-1 rounded min-w-[100px]">
          Delete User Account
        </span>
      </button>
      {modalOpen && (
        <ConfirmDeleteModal
          buttonText="Delete Account"
          description="Are you sure you want to delete this Account? This action cannot be undone."
          onClick={() => {
            if (selectedId) {
              handleAccountDelete(selectedId); // Call the delete function
            }
            setModalOpen(false); // Close the modal
          }}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        />
      )}
    </div>
  );
};

export const DeleteCourseByAdmin: React.FC<RowActionsProps> = ({ row }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const rowData = row.original as Course;
  const dispatch = useAppDispatch();

  const handleCourseDelete = async (courseId: string) => {
    try {
      await CourseAPI.deleteCourseByAdmin(courseId);
      dispatch(deleteCourse({ courseId: courseId }));
      toast.success("Course deleted successfully");
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response?.status === 500) {
        toast.error("Failed to Delete Course");
      }
    }
  };
  return (
    <div>
      <button
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-full transition-all duration-200 text-sm relative group"
        onClick={() => {
          setSelectedId(rowData._id);
          setModalOpen(true);
        }}
      >
        Delete
        <span className="hidden z-10 group-hover:block absolute left-0 top-full bg-gray-50 text-black p-1 rounded min-w-[100px]">
          Delete Course
        </span>
      </button>
      {modalOpen && (
        <ConfirmDeleteModal
          buttonText="Delete Account"
          description="Are you sure you want to delete this Course? This action cannot be undone."
          onClick={() => {
            if (selectedId) {
              handleCourseDelete(selectedId); // Call the delete function
            }
            setModalOpen(false); // Close the modal
          }}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        />
      )}
    </div>
  );
};
