import Head from "next/head";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";

import loginVector from "../../public/reading.svg";
import Link from "next/link";

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
    router.replace("/specialization");
  };

  return (
    <div className="flex flex-row h-screen items-center bg-[#F6F6F6]">
      <Head>
        <title>WoU SoAD Archival Page</title>
      </Head>
      <div className="w-[60%] h-screen bg-[#364E56] flex items-center justify-center">
        <Image
          priority
          src={loginVector}
          alt="Login Vector"
          className="w-[50%]"
        />
      </div>
      <div className="bg-[#F6F6F6] flex flex-col px-24 w-[40%] h-screen justify-center shadow-xl">
        <h1 className="text-2xl text-[#364E56] font-semibold">
          Sign In{" "}
          <span className="text-xs italic font-light">
            with your WoU SoAD Archival Platform Credentials
          </span>
        </h1>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <label htmlFor="email" className="mt-8 text-md font-normal">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="border-2 p-1.5"
          />
          <label className="font-normal" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="border-2 p-1.5"
          />
          <div className="flex items-center">

              <button className="text-md mt-4 text-[#364E56] border-[#364E56] hover:bg-[#364E56] transition-colors hover:text-white border-2 w-[35%] font-medium p-2 rounded-md">
                Sign In
              </button>

            <Link href="/" className="mt-5 mx-9 font-light">
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
