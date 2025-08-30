import { Button, Spinner, Textarea } from "@heroui/react";
import React, { useEffect, useState } from "react";
import { CreatePostApi, editPostApi } from "../Services/PostApi";

export default function CreatePost({
  postId,
  edit,
  setEdit,
  post,
  callback,
  minimal = false,
}) {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(post?.image ?? "");
  const [postBody, setPostBody] = useState(post?.body ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle image edit - convert URL to File object
  async function urlToFile() {
    if (!post?.image) return;

    try {
      const response = await fetch(post.image);
      const data = await response.blob();
      const file = new File([data], "image", { type: "image/jpg" });
      setImage(file);
    } catch (err) {
      console.error("Error converting URL to file:", err);
    }
  }

  useEffect(() => {
    if (edit && post?.image) {
      urlToFile();
    }

    // Cleanup function to revoke object URLs
    return () => {
      if (imageUrl && imageUrl.startsWith("blob:")) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [edit, post?.image]);

  // Create or edit post
  async function handleSubmit(e) {
    e.preventDefault();

    // Basic validation
    if (!postBody.trim() && !image) {
      setError("Please add some content or an image to your post.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("body", postBody.trim());

      if (image) {
        formData.append("image", image);
      }

      let responseData;
      if (edit) {
        responseData = await editPostApi(formData, postId);
      } else {
        responseData = await CreatePostApi(formData);
      }

      if (responseData) {
        // Call callback to refresh data
        if (callback) await callback();

        // Reset form for new posts, close edit mode for edits
        if (edit) {
          setEdit(false);
        } else {
          resetForm();
        }
      }
    } catch (error) {
      console.error("Error saving post:", error);

      // Handle specific error types
      if (error.response?.status === 401) {
        setError("Your session has expired. Please log in again.");
        // Optionally redirect to login
        // window.location.href = '/login';
      } else if (error.response?.status === 403) {
        setError("You don't have permission to perform this action.");
      } else if (error.response?.status >= 500) {
        setError("Server error. Please try again later.");
      } else {
        setError("Failed to save post. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  function handleCancel() {
    if (edit) {
      // Reset to original values when canceling edit
      setPostBody(post?.body ?? "");
      setImageUrl(post?.image ?? "");
      setEdit(false);
    } else {
      // Clear form when canceling new post
      resetForm();
    }
    setError("");
  }

  function resetForm() {
    setPostBody("");
    removeImage();
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file.");
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setError("Image must be smaller than 5MB.");
        return;
      }

      // Clean up previous URL
      if (imageUrl && imageUrl.startsWith("blob:")) {
        URL.revokeObjectURL(imageUrl);
      }

      setImage(file);
      setImageUrl(URL.createObjectURL(file));
      setError("");
    }
  }

  function removeImage() {
    if (imageUrl && imageUrl.startsWith("blob:")) {
      URL.revokeObjectURL(imageUrl);
    }
    setImageUrl("");
    setImage(null);

    // Clear file input
    const fileInput = document.getElementById("file-upload");
    if (fileInput) {
      fileInput.value = "";
    }
  }

  const isFormEmpty = !postBody.trim() && !image;

  return (
    <div
      className={
        edit ? "" : "user-post-container max-w-5xl mx-auto py-3 relative"
      }
    >
      {!edit && edit && (
        <div className="mb-3 flex items-center gap-2 text-blue-600 dark:text-blue-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
          <span className="text-sm font-medium">Editing Post</span>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="w-full mb-4 border bg-white border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 shadow-sm">
          <div className="px-4 py-2 rounded-t-lg dark:bg-gray-800">
            <Textarea
              value={postBody}
              onChange={(e) => setPostBody(e.target.value)}
              maxRows={edit ? 4 : 3}
              placeholder={
                edit ? "Edit your post..." : "What's On Your Mind ..."
              }
              classNames={{
                base: "w-full",
                input:
                  "bg-transparent text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 px-0",
                inputWrapper:
                  "bg-transparent shadow-none border-none outline-none focus:ring-0 focus:outline-none focus:border-none hover:border-none data-[hover=true]:border-none data-[hover=true]:shadow-none data-[focus=true]:border-none data-[focus=true]:shadow-none",
              }}
              disabled={loading}
            />
          </div>

          {/* Error message */}
          {error && (
            <div className="px-4 py-2 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-t border-red-200 dark:border-red-800">
              {error}
            </div>
          )}

          {/* Image preview */}
          {imageUrl && (
            <div className="relative">
              <img
                src={imageUrl}
                alt="Post preview"
                className="w-full object-cover p-5 rounded-lg"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-6 right-6 p-1 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
                aria-label="Remove image"
                disabled={loading}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="white"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}

          {/* Footer with controls */}
          <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600 border-gray-200">
            {/* Image upload button */}
            <div className="flex">
              <label
                htmlFor="file-upload"
                className={`cursor-pointer inline-flex items-center p-2 hover:text-cyan-900 rounded-full transition-colors ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <svg
                  className="w-5 h-5 text-cyan-800"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>
              </label>

              <input
                onChange={handleImageChange}
                id="file-upload"
                type="file"
                accept="image/*"
                className="hidden"
                disabled={loading}
              />
            </div>

            {/* Action buttons */}
            <div className="flex gap-2">
              {edit && (
                <Button
                  type="button"
                  onClick={handleCancel}
                  className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:ring-4 focus:ring-gray-100 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  Cancel
                </Button>
              )}

              <Button
                type="submit"
                className={`inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white rounded-lg focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed ${
                  edit
                    ? "bg-blue-600 hover:bg-blue-700 focus:ring-blue-100 dark:focus:ring-blue-900"
                    : "bg-cyan-800 hover:bg-cyan-900 focus:ring-cyan-50 dark:focus:ring-cyan-950"
                }`}
                disabled={loading || isFormEmpty}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" className="mr-2" />
                    {edit ? "Updating..." : "Posting..."}
                  </>
                ) : edit ? (
                  "Update"
                ) : (
                  "Post"
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>

      {/* Loading overlay */}
      {loading && !minimal && (
        <div className="absolute inset-0 bg-white/50 dark:bg-gray-900/50 flex justify-center items-center rounded-lg backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
            <Spinner size="lg" />
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {edit ? "Updating post..." : "Creating post..."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
