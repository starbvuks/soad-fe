import Head from "next/head";
import Link from "next/link";

import NavBar from "@/components/Navbar";

export default function Home() {
  return (
    <div>
      <NavBar />
      <div className="flex flex-col h-screen justify-center items-center bg-cover bg-main-bg bg-right-bottom font-WorkSans ">
        <Head>
          <title>Home Page</title>
        </Head>
        <div className="flex flex-col gap-3 text-left text-2xl justify-start w-[90%]">
          <span className="">Welcome to</span>
          <span className="text-6xl font-semibold">
            Digital Archival Platform
          </span>
          <span className="font-light">
            School of Arts and Design, Woxsen University
          </span>
          <Link
            href="/specialization"
            className="flex justify-between items-center w-[30%] mt-5 text-2xl font-light tracking-tight py-5 px-10 bg-[#D7616F] hover:bg-[#b14a56] text-white transition-all hover:scale-105"
          >
            Explore Our Works
            <img src="/btn-arrow.png" className="w-[20%]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
