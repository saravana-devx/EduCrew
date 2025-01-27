import React from "react";
import CourseForm from "./CourseForm";
import Section from "./Section";
import Final from "./Final";
import "./stepper.css";
import { useAppSelector } from "../../../hooks/redux.hook";
import {
  getCurrentStep,
  getEditStatus,
} from "../../../redux/slices/courseEditorSlice";
import { SomethingWentWrong } from "../../common/error/SomethingWentWrong";

const Stepper: React.FC = () => {
  const step = useAppSelector(getCurrentStep);
  const isEdit = useAppSelector(getEditStatus);
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <CourseForm />;
      case 2:
        return <Section />;
      case 3:
        return <Final />;
      default:
        return <SomethingWentWrong />;
    }
  };

  const steps = [1, 2, 3];
  const words = ["Basic Information", "Course Content", "Final"];

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <div className="text-center md:text-left">
          <h2 className="text-indigo-500 font-bold text-2xl sm:text-3xl">
            {isEdit === true ? "Edit existing Course" : "Add a New Course"}
          </h2>
          <p className="text-base sm:text-lg">
            Please fill in all the details of your course
          </p>
        </div>
      </div>
      <div className="mx-auto flex items-center justify-between mb-8">
        {steps.map((label, index) => (
          <div
            className={`step-item ${
              step > index ? "complete" : step === label ? "active" : ""
            }`}
            key={index}
          >
            <div
              className={`step ${
                step === label ? "active" : step > label ? "complete" : ""
              }`}
            >
              {label}
            </div>

            <span className="text-sm sm:text-base text-black mb-1">
              {words[index]}
            </span>
          </div>
        ))}
      </div>
      <div>{renderStepContent()}</div>
    </div>
  );
};

export default Stepper;
