import React, { useEffect } from "react";
import { useAppDispatch } from "../../hooks/redux.hook";
import {
  clearCourseData,
  setIsEdit,
} from "../../redux/slices/courseEditorSlice";
import Stepper from "../../components/course/createEdit/Stepper";

const CourseCreationPage: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setIsEdit(false));
    dispatch(clearCourseData());
  }, []);
  return (
    <div className="mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mt-16">
        <Stepper />
      </div>
    </div>
  );
};

export default CourseCreationPage;
