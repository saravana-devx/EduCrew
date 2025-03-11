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
import { getUsers, setUsers } from "../../../redux/slices/AdminDashboardSlice";

import { ProfileAPI } from "../../../api/auth/ProfileAPI";

const UserTable: React.FC = () => {
  const users = useAppSelector(getUsers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async function () {
      const result = await ProfileAPI.getUsersInfoForAdmin();
      dispatch(setUsers(result.data.users));
    })();
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
