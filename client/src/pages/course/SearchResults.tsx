import React from "react";
import LoadingCard from "../../components/course/LoadingCard";
import { useAppSelector } from "../../hooks/redux.hook";
import {
  getSearchResults,
  getLoading,
} from "../../redux/slices/courseDetailSlice";
import SearchInput from "../../components/common/SearchInput";
import CourseCard from "../../components/course/CourseCard";
import { NoResultsForSearchError } from "../../components/common/error/ErrorPage";

const SearchResultPage: React.FC = () => {
  const searchResults = useAppSelector(getSearchResults);
  const loading = useAppSelector(getLoading);

  return (
    <div className="max-w-7xl mx-auto flex flex-col items-start">
      <SearchInput />

      {loading ? (
        <LoadingCard />
      ) : searchResults.length > 0 ? (
        <div className="mb-44 mx-auto">
          <CourseCard courses={searchResults} />
        </div>
      ) : (
        <NoResultsForSearchError />
      )}
    </div>
  );
};

export default SearchResultPage;
