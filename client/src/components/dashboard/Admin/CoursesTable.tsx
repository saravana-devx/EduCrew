import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux.hook";
import { courseColumns, myFilter } from "./ColumnDefinition";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Fragment } from "react";
import TableComponent from "../tableComponent";
import {
  getCourses,
  setCourses,
} from "../../../redux/slices/AdminDashboardSlice";
import { ProfileAPI } from "../../../api/auth/ProfileAPI";
import { toast } from "react-toastify";

const CourseTable: React.FC = () => {
  const courses = useAppSelector(getCourses);
  // console.log("courses ---> ", courses)
  const dispatch = useAppDispatch();

  useEffect(() => {
    ProfileAPI.getCoursesInfoForAdmin()
      .then((result) => {
        if (result && result.data) {
          dispatch(setCourses(result.data.courses));
        } else {
          toast.error("Invalid response structure");
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          toast.error("You haven't created a course yet");
        } else {
          toast.error("Failed to fetch instructor data");
        }
      });
  }, [dispatch]);

  const [query, setQuery] = useState("");
  const [sortState, setSortState] = useState<SortingState>([]);

  const memoizedData = useMemo(() => courses, [courses]);

  const tableInstance = useReactTable({
    data: memoizedData,
    columns: courseColumns,
    state: {
      globalFilter: query,
      sorting: sortState,
    },
    onSortingChange: setSortState,
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setQuery,
    filterFns: {
      myFilter: myFilter,
    },
    globalFilterFn: "myFilter",
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <Fragment>
      <h3 className="text-xl font-bold mb-4">List of Courses</h3>
      <TableComponent
        setQuery={setQuery}
        tableInstance={tableInstance}
        query={query}
      />
    </Fragment>
  );
};
export default CourseTable;
