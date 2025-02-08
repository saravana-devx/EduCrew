import { RankingInfo, rankItem } from "@tanstack/match-sorter-utils";
import { createColumnHelper, FilterFn } from "@tanstack/react-table";
import { RowActions, ChangeCourseStatus } from "./RowAction";

export interface Course {
  _id: string;
  courseName: string;
  price: number;
  status: string;
  averageRating: number;
  totalStudentsEnrolled: number;
}

export interface DashboardData {
  courses: Course[];
  totalEarnings: number;
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

const columnHelper = createColumnHelper<Course>();

export const defaultColumns = [
  columnHelper.accessor("courseName", {
    header: "Course Name",
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor("price", {
    header: "Price",
    footer: (props) => props.column.id,
    cell: (props) => (
      <span className="flex items-center justify-center">
        &#8377;{props.getValue()}
      </span>
    ),
  }),
  columnHelper.display({
    id: "status",
    header: "Status",
    cell: (props) => <ChangeCourseStatus row={props.row} />,
  }),
  columnHelper.accessor("totalStudentsEnrolled", {
    header: "Total Students",
    footer: (props) => props.column.id,
    cell: (props) => (
      <span className="flex items-center justify-center">
        {props.getValue()}
      </span>
    ),
  }),
  columnHelper.accessor("averageRating", {
    header: "Average Rating",
    footer: (props) => props.column.id,
    cell: (props) => (
      <span className="flex items-center justify-center">
        {props.getValue()}
      </span>
    ),
  }),
  columnHelper.display({
    id: "actions",
    header: () => <span className="text-center w-full">Actions</span>,
    cell: (props) => <RowActions row={props.row} />,
  }),
];
