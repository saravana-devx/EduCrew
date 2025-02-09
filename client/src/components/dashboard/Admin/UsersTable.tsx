import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux.hook";
import { myFilter, userColumns } from "./ColumnDefinition";
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
  getUsers,
  setUsers,
} from "../../../redux/slices/AdminDashboardSlice";
import { toast } from "react-toastify";
import { ProfileAPI } from "../../../api/auth/ProfileAPI";

const UserTable: React.FC = () => {
  const users = useAppSelector(getUsers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    ProfileAPI.getUsersInfoForAdmin()
      .then((result) => {
        if (result && result.data) {
          dispatch(setUsers(result.data.users));
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
    data: users,
    columns: userColumns,
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
      <h3 className="text-xl font-bold mb-4">List of Users</h3>
      <TableComponent
        setQuery={setQuery}
        tableInstance={tableInstance}
        query={query}
      />
    </Fragment>
  );
};
export default UserTable;
