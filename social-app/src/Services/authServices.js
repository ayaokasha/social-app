import axios from "axios";

export async function getUserDataApi() {
  try {
    let { data } = await axios.get(
      "https://linked-posts.routemisr.com/users/profile-data",
      {
        headers: { token: localStorage.getItem("token") },
      }
    );
    console.log(data);

    return data;
  } catch (err) {
    console.log(err.response.data);
    return err.response.data;
  }
}

export async function sendRegisterData(userData) {
  try {
    let { data } = await axios.post(
      "https://linked-posts.routemisr.com/users/signup",
      userData
    );
    return data;
  } catch (err) {
    return err.response.data;
  }
}

export async function sendLoginData(userData) {
  try {
    let { data } = await axios.post(
      "https://linked-posts.routemisr.com/users/signin",
      userData
    );

    return data;
  } catch (err) {
    return err.response.data;
  }
}
