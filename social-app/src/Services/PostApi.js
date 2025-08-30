import axios from "axios";

export async function GetAllPostApi() {
  try {
    const { data } = await axios.get(
      "https://linked-posts.routemisr.com/posts",
      {
        headers: { token: localStorage.getItem("token") },
        params: {
          limit: 30,
          sort: "-createdAt",
        },
      }
    );
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function GetSinglePostApi(postId) {
  try {
    const { data } = await axios.get(
      "https://linked-posts.routemisr.com/posts/" + postId,
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

export async function GetProfileApi(userId) {
  try {
    const { data } = await axios.get(
      "https://linked-posts.routemisr.com/users/" + userId + "/posts",
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

export async function CreatePostApi(formData) {
  try {
    const response = await axios.post(
      "https://linked-posts.routemisr.com/posts",
      formData,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    console.log(response.data);
    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
export async function deletePostApi(postId) {
  try {
    const response = await axios.delete(
      "https://linked-posts.routemisr.com/posts/" + postId,

      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    console.log(response.data);
    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function editPostApi(formData, postId) {
  try {
    const response = await axios.put(
      "https://linked-posts.routemisr.com/posts/" + postId,
      formData,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    console.log(response.data);
    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
