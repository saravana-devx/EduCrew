import React from "react";

interface Props {
  currentPage: number;
  totalPages: number;
  handlePageClick: (page: number) => void;
}

const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  handlePageClick,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="w-full mt-8">
      <ul className="flex flex-row justify-end gap-x-2">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className="flex items-center gap-2 rounded-md border-2 border-violet-500 px-4 py-2 text-violet-700 transition-all duration-200 
        hover:bg-violet-200 hover:text-violet-900 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => handlePageClick(number)}
          >
            {number}
          </li>
        ))}
      </ul>
      <span className="flex items-center justify-end text-xl my-4 text-black">
        Page {currentPage} of {totalPages}
      </span>
    </div>
  );
};

export default Pagination;
