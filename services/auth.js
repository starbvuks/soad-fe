import axios from "axios";

const strapiUrl = process.env.NEXTAUTH_URL;

export async function signIn({ email, password }) {
  const res = await axios.post(`https://soad.alephinnovation.live/api/auth/local`, {
    identifier: email,
    password,
  });
  return res.data;
}
