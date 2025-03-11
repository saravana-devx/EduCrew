import React, { useState } from "react";
import { Section, SubSection } from "../../../utils/types";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux.hook";
import { SectionAPI } from "../../../api/course/SectionAPI";
import { toast } from "react-toastify";
import {
  addSection,
  deleteSection,
  getCourseData,
  setStep,
  updateSection,
  deleteSubsection,
} from "../../../redux/slices/courseEditorSlice";
import CourseSubSection from "./SubSection";
import { SubSectionAPI } from "../../../api/course/SubSection";
import { IoMdAddCircle } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const Content: React.FC = () => {
  const [sectionName, setSectionName] = useState<string>("");
  const [editSectionId, setEditSectionId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  //why we have used string("") here instead of null datatype ?
  const [currentSectionId, setCurrentSectionId] = useState<string>("");
  const [currentSubSection, setCurrentSubSection] = useState<SubSection | null>(
    null
  );

  const course = useAppSelector(getCourseData);
  const dispatch = useAppDispatch();

  const handleSectionInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSectionName(e.target.value);
  };

  const handleSectionSubmit = async () => {
    if (!course || !course._id) {
      toast.error("Course not found");
      return;
    }

    if (!sectionName.trim()) {
      toast.warn("Please provide a Module name");
      return;
    }

    try {
      if (editSectionId) {
        const response = await SectionAPI.updateSection(
          course._id,
          editSectionId,
          sectionName
        );
        dispatch(
          updateSection({
            sectionId: editSectionId,
            updatedSection: response.data.updatedSection,
          })
        );
        toast.success("Section updated successfully");
      } else {
        const response = await SectionAPI.createSection(
          course._id,
          sectionName
        );
        dispatch(addSection(response.data.section));
        toast.success("Section created successfully");
      }
      setSectionName("");
      setEditSectionId(null);
    } catch (error: unknown) {
      console.log(error);
      if (editSectionId) {
        toast.error("Failed to update Section.");
      } else {
        toast.error("Failed to create Section.");
      }
    }
  };

  const handleSectionEdit = (sectionId: string, sectionName: string) => {
    setSectionName(sectionName);
    setEditSectionId(sectionId);
  };

  const handleSectionDelete = async (sectionId: string) => {
    if (!course || !course._id) {
      toast.error("Course not found");
      return;
    }

    try {
      await SectionAPI.deleteSection(course._id, sectionId);
      dispatch(deleteSection(sectionId));
      toast.success("Module deleted successfully");
    } catch (error) {
      console.error("Failed to delete section:", error);
      toast.error("Failed to delete module");
    }
  };

  const openSubSectionModal = (sectionId: string, subSection?: SubSection) => {
    setCurrentSectionId(sectionId);
    setCurrentSubSection(subSection || null);
    setIsModalOpen(true);
  };

  const handleSubSectionDelete = async (
    sectionId: string,
    subSectionId: string
  ) => {
    try {
      await SubSectionAPI.deleteSubSection(sectionId, subSectionId);
      const subsectionId = subSectionId;
      dispatch(deleteSubsection({ sectionId, subsectionId }));
      toast.success("Subsection deleted successfully");
    } catch (error) {
      console.error("Failed to delete subsection:", error);
      toast.error("Failed to delete subsection");
    }
  };

  const handleNextPage = () => {
    if (course?.content && course.content.length === 0) {
      toast.warn("Add Sections");
    } else {
      dispatch(setStep(3));
    }
  };

  return (
    <>
      <div className="mx-auto bg-white border border-gray-200 shadow-lg rounded-lg p-6 h-full flex flex-col ">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Course Modules
        </h2>
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Module Name
          </label>
          <div className="flex">
            <input
              className="flex-1 bg-white px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring focus:ring-indigo-300 focus:border-indigo-500 transition-all"
              type="text"
              name="sectionName"
              value={sectionName}
              onChange={handleSectionInputChange}
              placeholder="Enter module name"
              required
            />
            <button
              type="button"
              onClick={handleSectionSubmit}
              className="bg-indigo-500 text-white px-4 py-2 rounded-r-md hover:bg-indigo-600 transition-all"
            >
              {editSectionId ? "Update Module" : "Add Module"}
            </button>
          </div>
        </div>

        {course?.content?.length ? (
          <div className="space-y-6">
            {course.content.map((section: Section) => (
              <div
                key={section._id}
                className="border border-gray-300 rounded-md p-4 bg-gray-50"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-medium text-gray-800">
                    {section.sectionName}
                  </h3>
                  <div className="flex space-x-2">
                    <FaEdit
                      onClick={() =>
                        handleSectionEdit(section._id, section.sectionName)
                      }
                      className="text-blue-600 hover:underline text-2xl cursor-pointer"
                    />
                    <MdDeleteForever
                      onClick={() => handleSectionDelete(section._id)}
                      className="text-red-600 hover:underline text-2xl cursor-pointer"
                    />
                    <IoMdAddCircle
                      className="text-blue-600 hover:underline text-2xl cursor-pointer"
                      onClick={() => openSubSectionModal(section._id)}
                    />
                  </div>
                </div>
                {section.subSection && section.subSection.length > 0 && (
                  <ul className="mt-4 space-y-4">
                    {section.subSection.map((subSection: SubSection) => (
                      <li
                        key={subSection._id}
                        className="border border-gray-200 rounded-md p-4 bg-white"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-700">
                              {subSection.title}
                            </h4>
                            <p className="text-gray-600 mt-1">
                              {subSection.description}
                            </p>
                            {/* {subSection.videoUrl && (
                              <video
                                src={subSection.videoUrl}
                                controls
                                className="mt-2 w-full max-w-md"
                              />
                            )} */}
                          </div>
                          <div className="flex space-x-2">
                            <FaEdit
                              onClick={() =>
                                openSubSectionModal(section._id, subSection)
                              }
                              className="text-blue-600 hover:underline cursor-pointer"
                            />
                            <MdDeleteForever
                              onClick={() =>
                                handleSubSectionDelete(
                                  section._id,
                                  subSection._id
                                )
                              }
                              className="text-red-600 hover:underline cursor-pointer"
                            />
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No modules added yet.</p>
        )}

        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={handleNextPage}
            className="bg-indigo-500 text-white px-6 py-3 rounded-md hover:bg-indigo-600 transition-all"
          >
            Next Step
          </button>
        </div>
      </div>

      {/* Modal Component for Adding/Editing Subsection */}
      {isModalOpen && (
        <CourseSubSection
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          sectionId={currentSectionId}
          editSubSection={currentSubSection}
        />
      )}
    </>
  );
};

export default Content;
