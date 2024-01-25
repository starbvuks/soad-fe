import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/specialization");
    } else {
      router.push("/auth/sign-in");
      console.log("session.jwt", session?.jwt);
    }
  }, [session]);

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      {/* <Head>
        <title>Strapi - Next - NextAuth</title>
      </Head>
      <div className="flex flex-col justify-center items-center bg-slate-300 rounded-3xl p-24">
        <h1 className="font-semibold text-3xl mb-12">
          {session ? "Authenticated" : "SoAD Archival Pages"}
        </h1>
        {session && (
          <div>
            <h3>Session Data</h3>
            <div>Email: {session.user.email}</div>
            <div>JWT from Strapi: Check console</div>
          </div>
        )}
        {session ? (
          <button onClick={signOut}>Sign out</button>
        ) : (
          <Link href="/auth/sign-in">
            <button className="text-xl bg-slate-800 text-white font-bold p-4 rounded-2xl">
              Sign In
            </button>
          </Link>
        )}
      </div> */}
    </div>
  );
}
