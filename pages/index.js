import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <Head>
        <title>Home Page</title>
      </Head>
      <span className="text-8xl font-extrabold">SOAD Archive</span>
      <Link
        href="/specialization"
        className="mx-4 mt-5 text-2xl font-light italic tracking-tight py-3 px-8 rounded-xl bg-black text-white hover:scale-125 transition hover:font-medium"
      >
        Enter
      </Link>
    </div>
  );
}
