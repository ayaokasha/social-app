import React, { useContext, useState } from "react";
import CardHeaderSection from "./CardHeader";
import { AuthContext } from "../Context/AuthContext";
import PostAction from "./PostAction";
import { UpdateCommentApi } from "../Services/CommentServices";

export default function Comments({ comment, postUserId, callback }) {
  const { userData } = useContext(AuthContext);

  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(comment.content || "");
  const [loading, setLoading] = useState(false);
  const isMyComment = userData?._id === comment.commentCreator?._id;

  async function saveEdit() {
    if (!content.trim()) return;
    setLoading(true);
    try {
      const res = await UpdateCommentApi(comment._id, {
        content: content.trim(),
      });
      if (res?.message || res?.success) {
        await callback?.();
        setEditing(false);
      } else {
        console.error("UpdateCommentApi returned:", res);
      }
    } catch (err) {
      console.error("Failed to update comment:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-gray-100 border-t border-gray-200 p-2">
      <div className="flex items-start justify-between w-full">
        <div className="flex-1">
          <CardHeaderSection
            photo={comment.commentCreator.photo}
            name={comment.commentCreator.name}
            date={comment.createdAt}
          />
        </div>

        {isMyComment && (
          <div className="ml-2">
            <PostAction
              commentId={comment._id}
              callback={callback}
              comment={comment}
              onEdit={() => {
                setEditing(true);
                setContent(comment.content || "");
              }}
            />
          </div>
        )}
      </div>

      <div className="ms-18.5 mt-0">
        {editing ? (
          <div className="space-y-2">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={3}
              className="w-full p-3 border rounded-md resize-none focus:ring-2 focus:ring-cyan-500 dark:bg-gray-800 dark:border-gray-700"
              placeholder="Edit your comment..."
              disabled={loading}
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => {
                  setEditing(false);
                  setContent(comment.content || "");
                }}
                className="px-3 py-1 border rounded text-gray-700"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="px-3 py-1 bg-cyan-700 text-white rounded"
                disabled={loading || !content.trim()}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        ) : (
          <p className="pb-3 -mt-3 text-gray-700">{comment.content}</p>
        )}
      </div>
    </div>
  );
}
