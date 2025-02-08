import React, { useState, useEffect } from "react";
import { FaBook, FaRupeeSign } from "react-icons/fa";
import { toast } from "react-toastify";

import StatsCard from "../StatsCard";

import { useAppDispatch, useAppSelector } from "../../../hooks/redux.hook";
import { ProfileAPI } from "../../../api/auth/ProfileAPI";
import { NoCreatedCoursesError } from "../../../components/common/error/ErrorPage";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { defaultColumns, myFilter } from "./ColumnDefinition";
import { RxCaretDown, RxCaretSort, RxCaretUp } from "react-icons/rx";
import {
  getInstructorDashboard,
  setInstructorDashboard,
} from "../../../redux/slices/InstructorDashboardSlice";
import { EarningsByCourse, EarningsByMonthChart } from "./Chart";
import Pagination from "../pagination";

const InstructorTable: React.FC = () => {
  // const initialData: DashboardData = {
  //   courses: [],
  //   totalEarnings: 0,
  // };
  // const [dashboardData, setDashboardData] =
  //   useState<DashboardData>(initialData);

  const dashboardData = useAppSelector(getInstructorDashboard);
  // console.log("dashboardData ---> ", dashboardData)
  const dispatch = useAppDispatch();
  useEffect(() => {
    ProfileAPI.getInstructorDashboardData()
      .then((result) => {
        if (result && result.data) {
          // setDashboardData(result.data);
          dispatch(
            setInstructorDashboard({
              courses: result.data.courses,
              totalEarnings: result.data.totalEarnings,
            })
          );
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

  const tableInstance = useReactTable({
    data: dashboardData.courses,
    columns: defaultColumns,
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

  if (!dashboardData) {
    return (
      <div>
        <NoCreatedCoursesError />
      </div>
    );
  }

  const { courses, totalEarnings } = dashboardData;

  return (
    <div className="p-6 bg-white min-h-[700px] mt-4">
      <h2 className="text-2xl font-bold mb-4">Instructor Dashboard</h2>

      <div className="max-w-4xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatsCard
          title="Total Courses"
          value={courses.length}
          icon={<FaBook size={24} />}
        />
        {/* <StatsCard
          title="Total Enrollment"
          value={courses.reduce(
            (total: number, course: Course) =>
              total + course.totalStudentsEnrolled,
            0
          )}
          icon={<FaUsers size={24} />}
        /> */}
        <StatsCard
          title="Revenue"
          value={totalEarnings}
          icon={<FaRupeeSign size={24} />}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full h-auto sm:w-[1500px] sm:h-[560px]">
        <div className="flex-1">
          <EarningsByCourse />
        </div>
        <div className="flex-1">
          <EarningsByMonthChart />
        </div>
      </div>

      <h3 className="text-xl font-bold mb-4">Your Courses</h3>
      <div className="bg-white rounded-lg shadow-md p-6 h-full">
        <div className="my-5 flex">
          <input
            className="w-full border-2 border-violet-300 p-2 text-violet-700 outline-none transition-colors duration-200 focus:border-violet-500"
            placeholder="Search..."
            value={query ?? ""}
            onChange={(e) => {
              setQuery(String(e.target.value));
            }}
          ></input>
        </div>
        <div className="max-w-full  overflow-x-scroll overflow-y-hidden">
          <div>
            <table className="border-2 w-full p-4 ">
              <thead className="border-2 bg-indigo-200">
                {tableInstance.getHeaderGroups().map((headerGroup) => {
                  return (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <th
                            className="text-left py-4 px-6 text-gray-600 font-semibold uppercase text-sm border-b"
                            colSpan={header.colSpan}
                            key={header.id}
                          >
                            {header.isPlaceholder ? null : (
                              <div
                                onClick={header.column.getToggleSortingHandler()}
                                className={`flex flex-row items-center justify-between gap-2 ${
                                  header.column.getCanSort()
                                    ? "cursor-pointer select-none"
                                    : null
                                }`}
                              >
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                                {header.column.getIsSorted() ? (
                                  header.column.getIsSorted() === "desc" ? (
                                    <RxCaretDown />
                                  ) : (
                                    <RxCaretUp />
                                  )
                                ) : (
                                  <RxCaretSort />
                                )}
                              </div>
                            )}
                          </th>
                        );
                      })}
                    </tr>
                  );
                })}
              </thead>
              <tbody>
                {tableInstance.getRowModel().rows.map((row) => {
                  return (
                    <tr key={row.id}>
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <td key={cell.id} className="border-2 p-2">
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <Pagination tableInstance={tableInstance} />
      </div>
    </div>
  );
};

export default InstructorTable;
