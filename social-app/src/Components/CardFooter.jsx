import React, { useState } from "react";
import { Button, CardFooter as HeroFooter, Input } from "@heroui/react";
import { Link } from "react-router-dom";
import { CreateCommentApi } from "../Services/CommentServices";
import Comments from "./Comments";

export default function CardFooterSection({ postId, setComments, comments }) {
  //^placeholders
  const [likesCount, setLikesCount] = useState(
    Math.floor(Math.random() * 500) + 1
  );
  const handelLike = () => {
    if (liked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setLiked(!liked);
  };
  const [liked, setLiked] = useState(false);
  //! comment handel

  const [commentContent, setCommentContent] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAddComment(e) {
    e.preventDefault();
    setLoading(true);

    const response = await CreateCommentApi(commentContent, postId);

    if (response.message) {
      setComments(response.comments);
      // await callback();
      setCommentContent("");
    }
    setLoading(false);
  }

  return (
    <HeroFooter className="flex flex-col py-2">
      {/* likes & comments */}
      <div className="flex justify-between items-center w-full mb-2">
        <div className="flex gap-0.5 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="size-5 text-red-600 active:scale-110 transition-transform duration-150"
          >
            <path d="M2 6.342a3.375 3.375 0 0 1 6-2.088 3.375 3.375 0 0 1 5.997 2.26c-.063 2.134-1.618 3.76-2.955 4.784a14.437 14.437 0 0 1-2.676 1.61c-.02.01-.038.017-.05.022l-.014.006-.004.002h-.002a.75.75 0 0 1-.592.001h-.002l-.004-.003-.015-.006a5.528 5.528 0 0 1-.232-.107 14.395 14.395 0 0 1-2.535-1.557C3.564 10.22 1.999 8.558 1.999 6.38L2 6.342Z" />
          </svg>

          <p className="text-sm text-gray-700">{likesCount} </p>
        </div>
        <div className="">
          <Link to={"/Post-details/" + postId} className="flex gap-0.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="size-5 text-amber-600"
            >
              <path
                fillRule="evenodd"
                d="M1 8.74c0 .983.713 1.825 1.69 1.943.764.092 1.534.164 2.31.216v2.351a.75.75 0 0 0 1.28.53l2.51-2.51c.182-.181.427-.286.684-.294a44.298 44.298 0 0 0 3.837-.293C14.287 10.565 15 9.723 15 8.74V4.26c0-.983-.713-1.825-1.69-1.943a44.447 44.447 0 0 0-10.62 0C1.712 2.435 1 3.277 1 4.26v4.482ZM5.5 6.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm2.5 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm3.5 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                clipRule="evenodd"
              />
            </svg>

            <p className="text-sm text-gray-700">{comments.length}</p>
          </Link>
        </div>
      </div>

      {/* comment box */}

      <div className="flex items-center py-4 w-full border-t border-default-200">
        {/* heart button */}
        <button
          type="button"
          onClick={handelLike}
          className="p-2 rounded-lg cursor-pointer transition-colors"
        >
          {liked ? (
            <svg
              className="w-6 h-6 text-red-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 
                   2 12.28 2 8.5 2 5.42 4.42 3 
                   7.5 3c1.74 0 3.41 0.81 4.5 
                   2.09C13.09 3.81 14.76 3 
                   16.5 3 19.58 3 22 5.42 
                   22 8.5c0 3.78-3.4 6.86-8.55 
                   11.54L12 21.35z"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.6"
                d="M4.318 6.318a4.5 4.5 0 
                   000 6.364L12 20.364l7.682-7.682a4.5 
                   4.5 0 00-6.364-6.364L12 
                   7.636l-1.318-1.318a4.5 4.5 
                   0 00-6.364 0z"
              />
            </svg>
          )}
        </button>

        {/* input */}

        <form
          onSubmit={handleAddComment}
          className="flex justify-between w-full"
        >
          <Input
            type="text"
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            name="comment"
            placeholder="Add a comment..."
            className="w-full text-sm focus:outline-none"
          />

          {/* send button */}
          <Button
            isIcon
            isLoading={loading}
            type="submit"
            disabled={commentContent.length < 2 || commentContent.length > 30}
            className="inline-flex justify-center p-2 text-cyan-800 rounded-full cursor-pointer
            active:scale-110 transition-transform duration-150 bg-transparent border-none shadow-none"
          >
            <svg
              className="w-5 h-5 rotate-90 rtl:-rotate-90"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 20"
            >
              <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
            </svg>
          </Button>
        </form>
      </div>
    </HeroFooter>
  );
}
