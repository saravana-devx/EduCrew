import React, { Fragment } from "react";
import Pagination from "./pagination";
import { flexRender, Table } from "@tanstack/react-table";
import { RxCaretDown, RxCaretUp, RxCaretSort } from "react-icons/rx";

interface TableProps<TData> {
  tableInstance: Table<TData>;
  query: string;
  setQuery: (query: string) => void;
}

const TableComponent = <T,>({
  tableInstance,
  query,
  setQuery,
}: TableProps<T>) => {
  return (
    <Fragment>
      <h3 className="text-xl font-bold mb-4">Your Courses</h3>
      <div className="bg-white rounded-lg shadow-md p-6 h-full">
        <div className="my-5 flex">
          <input
            className="w-full border-2 border-violet-300 p-2 text-violet-700 outline-none transition-colors duration-200 focus:border-violet-500"
            placeholder="Search..."
            value={query ?? ""}
            onChange={(e) => setQuery(String(e.target.value))}
          />
        </div>
        <div className="max-w-full overflow-auto">
          <table className="border-2 w-full p-4">
            <thead className="border-2 bg-indigo-200">
              {tableInstance.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      className="text-left py-4 px-6 text-gray-600 font-semibold uppercase text-sm border-b"
                      colSpan={header.colSpan}
                      key={header.id}
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          onClick={
                            header.column.getCanSort()
                              ? header.column.getToggleSortingHandler()
                              : undefined
                          }
                          className={`flex flex-row items-center justify-between gap-2 ${
                            header.column.getCanSort()
                              ? "cursor-pointer select-none"
                              : ""
                          }`}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {header.column.getCanSort() &&
                            (header.column.getIsSorted() === "desc" ? (
                              <RxCaretDown />
                            ) : header.column.getIsSorted() === "asc" ? (
                              <RxCaretUp />
                            ) : (
                              <RxCaretSort />
                            ))}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {tableInstance.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="border-2 p-2">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination tableInstance={tableInstance} />
      </div>
    </Fragment>
  );
};

export default TableComponent;
