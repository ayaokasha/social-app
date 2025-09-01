import { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { DeleteCommentApi } from "../Services/CommentServices";
import { deletePostApi } from "../Services/PostApi";
import CreatePost from "./CreatePost";

export default function PostAction({
  commentId,
  postId,
  callback,
  post,
  onEdit, 
}) {
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);

  async function handleDelete() {
    setLoading(true);
    try {
      let response;
      if (commentId) {
        response = await DeleteCommentApi(commentId);
      } else if (postId) {
        response = await deletePostApi(postId);
      }

      if (response?.message) {
        await callback?.();
      }
    } catch (err) {
      console.error("Delete error:", err);
    } finally {
      setLoading(false);
    }
  }

  function handleEditClick() {
    if (onEdit && commentId) {
      onEdit(); 
      return;
    }
    setEdit(true);
  }

  return (
    <>
      {edit ? (
        <CreatePost
          post={post}
          postId={post?._id}
          edit={edit}
          setEdit={setEdit}
          callback={callback}
        />
      ) : (
        <Dropdown>
          <DropdownTrigger>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 outline-0 cursor-pointer text-gray-500 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
              />
            </svg>
          </DropdownTrigger>
          <DropdownMenu aria-label="Actions">
            <DropdownItem key="edit" onClick={handleEditClick}>
              Edit
            </DropdownItem>
            <DropdownItem
              onClick={handleDelete}
              key="delete"
              className="text-danger"
              color="danger"
              isDisabled={loading}
            >
              {loading ? "Deleting..." : "Delete"}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
    </>
  );
}
