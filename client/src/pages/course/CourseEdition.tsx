import React, { useEffect } from "react";
import Stepper from "../../components/course/createEdit/Stepper";
import { useAppDispatch } from "../../hooks/redux.hook";
import { setIsEdit } from "../../redux/slices/courseEditorSlice";

const CourseEditionPage: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setIsEdit(true));
  }, []);

  return (
    <div className="mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mt-16">
        <Stepper />
      </div>
    </div>
  );
};

export default CourseEditionPage;
