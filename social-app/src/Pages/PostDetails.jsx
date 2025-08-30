import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetSingelPostApi } from "../Services/PostApi";
import PostCard from "../Components/PostCard";
import LoadingPost from "../Components/LoadingPost";

export default function PostDetails() {
  let { id } = useParams();

  const [post, setpost] = useState(null);

  async function getPost() {
    const response = await GetSingelPostApi(id);
    if (response.message) {
      setpost(response.post);
    }
  }

  useEffect(() => {
    getPost();
  }, []);
  return (
    <>
      <div className="max-w-5xl mx-auto p-3">
        {post ? (
          <PostCard post={post} commentLimit={post.comments.length} />
        ) : (
          <LoadingPost />
        )}
      </div>
    </>
  );
}
