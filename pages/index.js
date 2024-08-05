import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";

import React, { useState, useEffect } from "react";

import Loading from "./loading";
import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 750);
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <NavBar />
            <Head>
              <title>Home Page</title>
            </Head>
          <div className="flex h-screen justify-center gap-4 align-center items-center bg-[#FFE6E6] font-WorkSans px-20">
            <div className="flex flex-col gap-3 text-left text-2xl w-[90%]">
              <span className="">Welcome to</span>
              <span className="text-6xl font-semibold">
                Digital Archival Platform
              </span>
              <span className="font-light">
                School of Arts and Design, Woxsen University
              </span>
              <Link
                href="/specialization"
                className="flex justify-between items-center w-[50%] mt-5 text-2xl font-light tracking-tight py-5 px-10 bg-[#D7616F] hover:bg-[#b14a56] text-white transition-all"
              >
                Explore Our Works
                <img src="/btn-arrow.png" className="w-[20%]" />
              </Link>
            </div>
            <div className="flex justify-end">
              <img src="/collage.png" className="w-[90%] self-end" />
            </div>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
}
