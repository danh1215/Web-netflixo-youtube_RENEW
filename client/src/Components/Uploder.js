import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import { uploadImageservice } from "../Redux/APIs/ImageUploadService";
import Loader from "./Notfications/Loader";

function Uploder({ setImageUrl }) {
  const [loading, setLoading] = useState(false);

  // upload file
  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = new FormData();
      file.append("file", acceptedFiles[0]);
      const data = await uploadImageservice(file, setLoading);
      setImageUrl(data);
    },
    [setImageUrl]
  ); 

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      multiple: false,
    });
  return (
    <div className="w-full text-center flex-colo gap-6">
      {loading ? (
        <div className="px-6 w-full py-8 border-2 border-border border-dashed bg-dry rounded-md">
          <Loader />
        </div>
      ) : (
        <div
          {...getRootProps()}
          className="px-6 w-full py-8 border-2 border-border border-dashed bg-main rounded-md cursor-pointer"
        >
          <input {...getInputProps()} />
          <span className="mx-auto flex-colo text-subMain text-3xl">
            <FiUploadCloud />
          </span>
          <p className="text-sm mt-2">Drag your image here</p>
          <em className="text-xs text-border">
            {isDragActive
              ? "Drop it like it's hot!"
              : isDragReject
              ? "Unsupported file type..."
              : "only .jpg and .png files will be accepted"}
          </em>
        </div>
      )}
    </div>
  );
}

export default Uploder;
