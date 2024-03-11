import axios from "axios";

const strapiUrl = process.env.NEXTAUTH_URL;

export async function signIn({ email, password }) {
  const res = await axios.post(`http://ec2-54-84-35-62.compute-1.amazonaws.com:1337/api/auth/local`, {
    identifier: email,
    password,
  });
  return res.data;
}
