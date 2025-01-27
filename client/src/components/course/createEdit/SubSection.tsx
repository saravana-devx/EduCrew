import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { SubSectionAPI } from "../../../api/course/SubSection";
import { useAppDispatch } from "../../../hooks/redux.hook";
import {
  addSubsection,
  updateSubsection,
} from "../../../redux/slices/courseEditorSlice";
import { SubSection } from "../../../utils/types";

interface CourseSubSectionProps {
  isOpen: boolean;
  onClose: () => void;
  sectionId: string;
  editSubSection?: SubSection | null;
}

const CourseSubSection: React.FC<CourseSubSectionProps> = ({
  isOpen,
  onClose,
  sectionId,
  editSubSection = null,
}) => {
  const dispatch = useAppDispatch();
  const [subSectionData, setSubSectionData] = useState<SubSection>({
    _id: "",
    sectionId: "",
    title: "",
    description: "",
    video: "",
  });
  const [isUploading, setIsUploading] = useState<boolean>(false);

  useEffect(() => {
    if (editSubSection) {
      console.log("edit Sub Section -> ", editSubSection);
      setSubSectionData({
        _id: editSubSection._id,
        sectionId: sectionId,
        title: editSubSection.title,
        description: editSubSection.description,
        video: editSubSection.video,
      });
    } else {
      setSubSectionData({
        _id: "",
        sectionId: "",
        title: "",
        description: "",
        video: "",
      });
    }
  }, [editSubSection]);

  console.log("New Sub Section data -> ", subSectionData);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSubSectionData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size > 30 * 1024 * 1024) {
      toast.warn("File is too big!");
      return;
    }
    if (file) {
      setSubSectionData((prev) => ({ ...prev, video: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!subSectionData.title.trim()) {
      toast.warn("Title is required");
      return;
    }
    if (!subSectionData.description.trim()) {
      toast.warn("Description is required");
      return;
    }
    if (!subSectionData.video && !editSubSection?.video) {
      toast.warn("Video is required");
      return;
    }

    const formData = new FormData();
    formData.append("title", subSectionData.title);
    formData.append("description", subSectionData.description);
    if (subSectionData.video) {
      formData.append("video", subSectionData.video);
    }

    try {
      setIsUploading(true);
      if (editSubSection) {
        const response = await SubSectionAPI.updateSubSection(
          formData,
          sectionId,
          editSubSection._id
        );
        dispatch(
          updateSubsection({
            sectionId,
            subsectionId: editSubSection._id,
            updatedSubsection: response.data.updatedSubSection,
          })
        );
        toast.success("Subsection updated successfully");
      } else {
        const response = await SubSectionAPI.createSubSection(
          formData,
          sectionId
        );
        dispatch(
          addSubsection({
            sectionId,
            subsection: response.data.subSection,
          })
        );
        toast.success("Subsection added successfully");
      }
      onClose();
    } catch (error) {
      console.error("Subsection operation failed:", error);
      toast.error("Failed to perform subsection operation");
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {editSubSection ? "Edit Subsection" : "Add Subsection"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={subSectionData.title}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-500"
              placeholder="Enter subsection title"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={subSectionData.description}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 h-24 focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-500"
              placeholder="Enter subsection description"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Video
            </label>
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-500"
            />
            {editSubSection?.video && subSectionData.video && (
              <p className="text-sm text-red-600 mt-2">
                {/* Current video is already uploaded.
                select another if you want */}
                A video is already uploaded. Choose a different one to replace
                it.
              </p>
            )}
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-all"
              disabled={isUploading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-all disabled:opacity-50"
              disabled={isUploading}
            >
              {isUploading
                ? editSubSection
                  ? "Updating..."
                  : "Adding..."
                : editSubSection
                ? "Update"
                : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseSubSection;
