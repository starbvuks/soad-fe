import axios from "axios";

const strapiUrl = process.env.NEXTAUTH_URL;

export async function signIn({ email, password }) {
  const res = await axios.post(`https://admin.soad.co.in/api/auth/local`, {
    identifier: email,
    password,
  });
  return res.data;
}
