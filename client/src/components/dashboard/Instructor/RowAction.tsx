import { Row, RowData } from "@tanstack/react-table";
import { CourseAPI } from "../../../api/course/CourseAPI";
import { toast } from "react-toastify";
import {
  clearCourseData,
  setActiveCourse,
} from "../../../redux/slices/courseEditorSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux.hook";
import { useNavigate } from "react-router-dom";

import {
  changeCourseStatus,
  getInstructorDashboard,
  setInstructorDashboard,
} from "../../../redux/slices/InstructorDashboardSlice";
import { Course } from "./ColumnDefinition";
import { AxiosError } from "axios";
type RowActionsProps = {
  row: Row<RowData>;
};

//component for edit/delete button for courses
export const RowActions: React.FC<RowActionsProps> = ({ row }) => {
  const rowData = row.original as Course;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const dashboardData = useAppSelector(getInstructorDashboard);

  const handleDelete = async (courseId: string) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await CourseAPI.deleteCourseByInstructor(courseId);
        dispatch(
          setInstructorDashboard({
            courses: dashboardData.courses.filter(
              (course) => course._id != rowData._id
            ),
            totalEarnings: dashboardData.totalEarnings,
          })
        );
        toast.success("Course deleted successfully");
      } catch (error: unknown) {
        if (error instanceof AxiosError && error.response?.status === 500) {
          toast.error("Failed to Delete Course");
        }
      }
    }
  };

  const handleEdit = async (courseId: string) => {
    const result = await CourseAPI.getCourseById(courseId);
    if (result && result.data) {
      dispatch(clearCourseData());
      dispatch(setActiveCourse(result.data.course));
      navigate(`/edit-course/${result.data.course._id}`);
    } else {
      toast.error("Failed to fetch course details");
    }
  };

  return (
    <div className="flex space-x-3 justify-center">
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-full transition-all duration-200 text-sm relative group"
        onClick={() => handleEdit(rowData._id)}
      >
        Edit
        <span className="hidden group-hover:block absolute left-0 top-full bg-gray-50 text-black p-1 rounded min-w-[80px]">
          Edit Course
        </span>
      </button>
      <button
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-full transition-all duration-200 text-sm relative group"
        onClick={() => handleDelete(rowData._id)}
      >
        Delete
        <span className="hidden group-hover:block absolute left-0 top-full bg-gray-50 text-black p-1 rounded min-w-[100px]">
          Delete Course
        </span>
      </button>
    </div>
  );
};

// change status of course between published <-> Draft
export const ChangeCourseStatus: React.FC<RowActionsProps> = ({ row }) => {
  const dispatch = useAppDispatch();
  const rowData = row.original as Course;
  const handleToggleStatus = async (
    courseId: string,
    currentStatus: string
  ) => {
    const newStatus = currentStatus === "Published" ? "Draft" : "Published";
    try {
      await CourseAPI.updateCourseStatus(courseId, newStatus);
      dispatch(
        changeCourseStatus({
          status: newStatus,
          courseId: rowData._id,
        })
      );
      toast.success(`Course status updated to ${newStatus}`);
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response?.status === 500) {
        toast.error(`Failed to change course to  ${newStatus}`);
      }
    }
  };
  console.log(rowData);
  return (
    <div className="py-4 px-6 text-center">
      <button
        className={`${
          rowData.status === "Published"
            ? "bg-green-500 hover:bg-green-600"
            : "bg-red-500 hover:bg-red-600"
        } text-white px-4 py-1 rounded-full transition-all duration-200 text-sm relative group`}
        onClick={() => handleToggleStatus(rowData._id, rowData.status)}
      >
        {rowData.status === "Published" ? "Published" : "Draft"}
        <span className="hidden group-hover:block absolute left-8 top-full  bg-gray-50 text-black p-1 rounded-md min-w-[120px]">
          change course to{" "}
          {rowData.status === "Published" ? "Draft" : "Published"}
        </span>
      </button>
    </div>
  );
};
