import axios from "axios";

const strapiUrl = process.env.NEXTAUTH_URL;

export async function signIn({ email, password }) {
  const res = await axios.post(`http://35.174.134.162:1337/api/auth/local`, {
    identifier: email,
    password,
  });
  return res.data;
}
