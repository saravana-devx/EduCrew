import React, { useState } from "react";
import { FilePond, File, registerPlugin } from "react-filepond";

// Import FilePond styles and plugins
import "filepond/dist/filepond.min.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";

// Register the plugins
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateSize,
  FilePondPluginFileValidateType,
  FilePondPluginImageResize,
  FilePondPluginImageCrop,
  FilePondPluginImageTransform
);

// FilePondComponent
interface FilePondComponentProps {
  acceptedFileTypes: string[];
  maxFileSize: string;
  onSubmit: (files: File[]) => void;
}

const FilePondComponent: React.FC<FilePondComponentProps> = ({
  acceptedFileTypes,
  maxFileSize,
  onSubmit,
}) => {
  const [files, setFiles] = useState<File[]>([]); // State to handle selected files

  const handleFileUpdate = (fileItems: File[]) => {
    // Extract the underlying File object and update state
    const updatedFiles = fileItems.map((item) => item.file as File);
    setFiles(updatedFiles);
  };

  const handleSubmit = () => {
    if (files.length > 0) {
      onSubmit(files); // Trigger onSubmit with the selected files
    }
  };

  return (
    <div className="">
      <FilePond
        files={files}
        required
        acceptedFileTypes={acceptedFileTypes} // Accept specific file types passed from parent
        maxFileSize={maxFileSize} // Set maximum file size
        imagePreviewHeight={200} // Set image preview height
        imageCropAspectRatio="1:1"
        imageResizeTargetWidth={100}
        imageResizeTargetHeight={100}
        imageResizeMode="cover"
        imageTransformOutputQuality={50}
        imageTransformOutputQualityMode="optional"
        onupdatefiles={handleFileUpdate}
        instantUpload={false} // Disable auto-upload
        allowMultiple={false} // Allow only one file at a time
        name="files"
        labelIdle="Drag & Drop your files or <span class='filepond--label-action'>Browse</span>"
      />
      <button onClick={handleSubmit} disabled={files.length === 0}>
        Submit
      </button>{" "}
      {/* Disable button if no files are selected */}
    </div>
  );
};

// FileUpload for Images
export const ImageUpload: React.FC = () => {
  const maxFileSize = "10mb";
  const acceptedFileTypes = ["image/*"];

  const handleImageSubmit = (files: File[]) => {
    console.log("Image uploaded:", files);
  };

  return (
    <div className="w-96 mx-auto my-8">
      <FilePondComponent
        acceptedFileTypes={acceptedFileTypes}
        maxFileSize={maxFileSize}
        onSubmit={handleImageSubmit}
      />
    </div>
  );
};

// FileUpload for Videos
export const VideoUpload: React.FC = () => {
  const maxFileSize = "40mb";
  const acceptedFileTypes = ["video/*"];

  const handleVideoSubmit = (files: File[]) => {
    console.log("Video uploaded:", files);
  };

  return (
    <div className="w-96 mx-auto my-8">
      <FilePondComponent
        acceptedFileTypes={acceptedFileTypes}
        maxFileSize={maxFileSize}
        onSubmit={handleVideoSubmit}
      />
    </div>
  );
};
