import axios from "axios";

export async function uploadProfilePhoto(formData) {
  try {
    const response = await axios.put(
      "https://linked-posts.routemisr.com/users/upload-photo",
      formData,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error("Error uploading profile photo:", err);
    throw err;
  }
}
