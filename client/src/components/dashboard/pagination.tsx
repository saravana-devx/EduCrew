import { Table } from "@tanstack/react-table";
import React from "react";

type PaginationProps<TData> = {
  tableInstance: Table<TData>;
};

import {
  AiOutlineDoubleLeft,
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineDoubleRight,
} from "react-icons/ai";

const Button = ({
  onClick,
  disabled,
  children,
}: {
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
}) => (
  <button
    className="flex items-center gap-2 rounded-md border-2 border-violet-500 px-4 py-2 text-violet-700 transition-all duration-200 
              hover:bg-violet-200 hover:text-violet-900 disabled:cursor-not-allowed disabled:opacity-50"
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

const Pagination = <TData,>({ tableInstance }: PaginationProps<TData>) => {
  return (
    <div className="mt-5 flex flex-wrap lg:justify-end items-center gap-5 p-5 rounded-lg ">
      {/* Navigation Buttons */}
      <div className="flex flex-wrap gap-3">
        <Button
          onClick={() => tableInstance.setPageIndex(0)}
          disabled={!tableInstance.getCanPreviousPage()}
        >
          <AiOutlineDoubleLeft size={18} />
          First
        </Button>

        <Button
          onClick={() => tableInstance.previousPage()}
          disabled={!tableInstance.getCanPreviousPage()}
        >
          <AiOutlineLeft size={18} />
          Prev
        </Button>

        <Button
          onClick={() => tableInstance.nextPage()}
          disabled={!tableInstance.getCanNextPage()}
        >
          Next
          <AiOutlineRight size={18} />
        </Button>

        <Button
          onClick={() => tableInstance.lastPage()}
          disabled={!tableInstance.getCanNextPage()}
        >
          Last
          <AiOutlineDoubleRight size={18} />
        </Button>
      </div>

      {/* Page Indicator */}
      <span className="rounded-md bg-violet-100 px-3 py-1 text-violet-700 font-medium">
        Page {tableInstance.getState().pagination.pageIndex + 1} of{" "}
        {tableInstance.getPageCount()}
      </span>

      {/* Page Size Selector */}
      <select
        className="rounded-lg border-2 border-violet-400 px-3 py-2 text-violet-700 outline-none transition-all duration-200 
                  hover:bg-violet-200"
        value={tableInstance.getState().pagination.pageSize}
        onChange={(e) => tableInstance.setPageSize(Number(e.target.value))}
      >
        {[5, 10, 20, 30, 40, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Pagination;
