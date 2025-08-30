import React, { useState } from "react";
import { Button, Card, Input } from "@heroui/react";
import CardHeaderSection from "./CardHeader";
import CardBodySection from "./CadrdBody";
import CardFooterSection from "./CardFooter";
import Comments from "./Comments";
import {
  GetPostCommentApi,
} from "../Services/CommentServices";

export default function PostCard({ post, commentLimit, callback }) {
  // comment handel
  const [comments, setComments] = useState(post.comments || []);

  async function getPostComment() {
    const response = await GetPostCommentApi(post.id);
    setComments(response.comments);
  }


  return (
    <div className="card-container py-3 max-w-5xl ">
      <Card>
        <CardHeaderSection
          userId={post.user._id}
          photo={post.user.photo}
          name={post.user.name}
          date={post.createdAt}
          postId={post.id}
          post={post}
          callback={callback}
        />
        <CardBodySection body={post.body} image={post.image} />
        <CardFooterSection
          postId={post.id}
          post={post}
          comments={comments}
          setComments={setComments}
        />
        {comments?.length > 0 &&
          comments.slice(0, commentLimit).map((comment) => (
            <Comments
              postUserId={post?.user?._id} 
              comment={comment}
              key={comment._id}
              callback={getPostComment}
            />
          ))}
      </Card>
    </div>
  );
}
