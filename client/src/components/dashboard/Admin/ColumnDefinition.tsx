import { RankingInfo, rankItem } from "@tanstack/match-sorter-utils";
import { createColumnHelper, FilterFn } from "@tanstack/react-table";
import { DeleteCourseByAdmin, DeleteUserAccount } from "./RowAction";

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

declare module "@tanstack/table-core" {
  interface FilterFns {
    myFilter: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

export const myFilter: FilterFn<Course> = (
  row,
  columnId,
  filterValue: string,
  addMeta
) => {
  const itemRank = rankItem(row.getValue(columnId), filterValue);
  addMeta({ itemRank });
  return itemRank.passed;
};

const courseColumnHelper = createColumnHelper<Course>();

export const courseColumns = [
  courseColumnHelper.accessor("courseName", {
    header: "CourseName",
    footer: (props) => props.column.id,
  }),
  courseColumnHelper.accessor("price", {
    header: "Price",
    footer: (props) => props.column.id,
    cell: (props) => (
      <span className="flex items-center justify-center">
        &#8377;{props.getValue()}
      </span>
    ),
  }),
  courseColumnHelper.accessor("instructor", {
    header: "Instructor",
    footer: (props) => props.column.id,
  }),
  courseColumnHelper.accessor("studentEnrolled", {
    header: "Total Students",
    footer: (props) => props.column.id,
    cell: (props) => (
      <span className="flex items-center justify-center">
        {props.getValue()}
      </span>
    ),
  }),
  courseColumnHelper.accessor("averageRating", {
    header: "Average Rating",
    footer: (props) => props.column.id,
    cell: (props) => (
      <span className="flex items-center justify-center">
        {props.getValue()}
      </span>
    ),
  }),
  courseColumnHelper.display({
    id: "actions",
    header: () => <span className="text-center w-full">Actions</span>,
    cell: (props) => <DeleteCourseByAdmin row={props.row} />,
  }),
];

const userColumnHelper = createColumnHelper<User>();

export const userColumns = [
  userColumnHelper.accessor("name", {
    header: "Name",
    footer: (props) => props.column.id,
  }),
  userColumnHelper.accessor("email", {
    header: "Email",
    footer: (props) => props.column.id,
    cell: (props) => (
      <span className="flex items-center justify-start">
        {props.getValue()}
      </span>
    ),
  }),
  userColumnHelper.accessor("accountType", {
    header: "Account Type",
    footer: (props) => props.column.id,
    cell: (props) => (
      <span className="flex items-center justify-center">
        {props.getValue()}
      </span>
    ),
  }),
  //   isActive is an boolean value
  // i want to display active for true-> and inactive for false
  userColumnHelper.accessor("isActive", {
    header: "Account Status",
    footer: (props) => props.column.id,
    cell: (props) => (
      <span
        className={`flex items-center justify-start ${
          props.getValue() ? "text-green-500" : "text-red-500"
        }`}
      >
        {props.getValue() ? "Active" : "Inactive"}
      </span>
    ),
  }),
  userColumnHelper.display({
    id: "actions",
    header: () => <span className="text-center w-full">Actions</span>,
    cell: (props) => <DeleteUserAccount row={props.row} />,
  }),
];
