import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useAppDispatch } from "../../hooks/redux.hook";
import { useNavigate } from "react-router-dom";
import { CourseAPI } from "../../api/course/CourseAPI";
import {
  setLoading,
  setSearchResults,
} from "../../redux/slices/courseDetailSlice";

const SearchInput: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState({ query: "" });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearch((prev) => ({ ...prev, [name]: value }));
  };

  const performSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(setLoading(true));
    await CourseAPI.getSearchResult(search.query)
      .then((result) => {
        if (result.success) {
          dispatch(setSearchResults(result.data.searchResults));
        }
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.status === 404
        ) {
          dispatch(setSearchResults([]));
        } else {
          dispatch(setSearchResults([]));
        }
      })
      .finally(() => {
        navigate(`/search?query=${search.query}`);
        dispatch(setLoading(false));
      });
  };

  return (
    <div className="flex  sm:flex-row w-11/12 md:w-7/12 mx-auto my-4 border border-gray-200 bg-blue-50 rounded-xl px-2 py-2">
      <input
        type="text"
        name="query"
        className="flex-1 border-none outline-none bg-blue-50  px-2 py-1 border-l border-gray-200"
        placeholder="Find Your Courses..."
        value={search.query}
        onChange={onChangeHandler}
      />
      <button
        className="flex items-center gap-x-2 font-medium px-4 py-2 bg-indigo-500 text-white rounded-3xl hover:bg-slate-900 hover:scale-105 transition-transform duration-200"
        onClick={performSearch}
      >
        <span className="text-2xl">
          <CiSearch />
        </span>
        Search
      </button>
    </div>
  );
};

export default SearchInput;
