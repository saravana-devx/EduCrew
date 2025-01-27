import React, { useState } from "react";
import {
  FaCaretDown,
  FaCaretUp,
  FaCheckCircle,
  // FaRegCircle,
} from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux.hook";
import { getCompletedVideosByCourseId } from "../../../redux/slices/userSlice";
import {
  getActiveCourse,
  setActiveSubSection,
} from "../../../redux/slices/courseDetailSlice";
import { Section, SubSection } from "../../../utils/types";

export interface CourseContentProps {
  content: Section[];
}

const Content: React.FC<CourseContentProps> = ({ content }) => {
  const [visibleSections, setVisibleSections] = useState<
    Record<string, boolean>
  >({});
  const activeCourse = useAppSelector((state) => getActiveCourse(state));
  const completedVideos = useAppSelector((state) =>
    activeCourse ? getCompletedVideosByCourseId(state, activeCourse._id) : []
  );
  const toggleSection = (moduleId: string) => {
    setVisibleSections((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };
  const dispatch = useAppDispatch();

  return (
    <div className="p-4 rounded-lg shadow-sm mt-2 md:mt-5">
      <h4 className="text-3xl font-bold text-blue-600 mb-8">Course Content</h4>
      {content && content.length > 0 ? (
        content.map((section: Section) => (
          <div
            key={section._id}
            className="mb-6 p-4 border border-gray-300 rounded-lg shadow-sm "
          >
            <h5 className="text-xl font-semibold text-gray-800 flex justify-between items-center mb-4">
              <span className="flex items-center">{section.sectionName}</span>
              <button
                onClick={() => toggleSection(section._id)}
                className="text-gray-700 hover:text-gray-900 transition-transform transform"
              >
                {visibleSections[section._id] ? (
                  <FaCaretUp size={24} />
                ) : (
                  <FaCaretDown size={24} />
                )}
              </button>
            </h5>
            {visibleSections[section._id] &&
            section.subSection &&
            section.subSection.length > 0 ? (
              <ul className="space-y-2">
                {section.subSection.map((subsection: SubSection) => (
                  <li
                    key={subsection._id}
                    className="cursor-pointer bg-indigo-50 hover:bg-indigo-200 p-4 rounded-lg transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {completedVideos.includes(subsection._id) ? (
                          <FaCheckCircle
                            className="text-green-500 mr-2"
                            size={20}
                          />
                        ) : (
                          <FaCheckCircle
                            className="text-gray-500 mr-2"
                            size={20}
                          />
                        )}
                        <span
                          className={`text-gray-800 font-medium hover:underline cursor-pointer ${
                            completedVideos.includes(subsection._id)
                              ? "text-green-500"
                              : "text-gray-800"
                          }`}
                          onClick={() =>
                            dispatch(setActiveSubSection(subsection))
                          }
                        >
                          {subsection.title}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 mt-2">
                      {subsection.description}
                    </p>
                  </li>
                ))}
              </ul>
            ) : visibleSections[section._id] ? (
              <p className="text-gray-500 mt-3">No subSections available</p>
            ) : null}
          </div>
        ))
      ) : (
        <p className="text-gray-500">No Section available</p>
      )}
    </div>
  );
};

export default Content;
