import Head from "next/head";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function SignIn() {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email: e.target.email.value,
      password: e.target.password.value,
    });
    if (result.ok) {
      router.replace("/specialization");
      return;
    }
    alert("Credential is not valid");
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <Head>
        <title>Strapi - Next - NextAuth</title>
      </Head>
      <h1 className="text-2xl font-medium">Sign In</h1>
      <form onSubmit={onSubmit} className="flex flex-col gap-6">
        <label htmlFor="email" className="mt-10">
          Email
        </label>
        <input id="email" name="email" type="email" className="border-2" />
        <label className="mt-6" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="border-2"
        />
        <button className="text-lg bg-slate-800 text-white font-medium p-4 rounded-2xl">
          Sign In
        </button>
      </form>
    </div>
  );
}
