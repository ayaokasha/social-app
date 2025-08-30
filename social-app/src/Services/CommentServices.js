import axios from "axios";

export async function CreateCommentApi(commentContent, postId) {
  try {
    const { data } = await axios.post(
      "https://linked-posts.routemisr.com/comments",
      { content: commentContent, post: postId },
      {
        headers: { token: localStorage.getItem("token") },
      }
    );
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function DeleteCommentApi(commentId) {
  try {
    const { data } = await axios.delete(
      "https://linked-posts.routemisr.com/comments/" + commentId,
      {
        headers: { token: localStorage.getItem("token") },
      }
    );
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function GetPostCommentApi(postId) {
  try {
    const { data } = await axios.get(
      "https://linked-posts.routemisr.com/posts/" + postId + "/comments",
      {
        headers: { token: localStorage.getItem("token") },
      }
    );
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function UpdateCommentApi(commentId, body) {
  try {
    const { data } = await axios.put(
      `https://linked-posts.routemisr.com/comments/${commentId}`,
      body,
      {
        headers: { token: localStorage.getItem("token") },
      }
    );
    return data;
  } catch (err) {
    console.error("UpdateCommentApi error:", err);
    throw err;
  }
}
