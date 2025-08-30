import React, { useState } from "react";
import { Button, Spinner } from "@heroui/react";
import { uploadProfilePhoto } from "../Services/userServices";

export default function UploadPic({ onUpload }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setError("");

    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("photo", file);

      const response = await uploadProfilePhoto(formData);

      if (response?.message === "success") {
        localStorage.setItem("userAvatar", preview);
        onUpload(preview);
      } else {
        setError("Upload failed. Please try again.");
      }
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-32 h-32 rounded-full object-cover border-2"
        />
      )}

      <input type="file" accept="image/*" onChange={handleFileChange} />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Button
        onClick={handleUpload}
        disabled={loading || !file}
        color="primary"
        className="w-full"
      >
        {loading ? (
          <>
            <Spinner size="sm" /> Uploading...
          </>
        ) : (
          "Upload Photo"
        )}
      </Button>
    </div>
  );
}
