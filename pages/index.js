import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

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
          <div className="flex flex-col lg:flex-row h-screen lg:justify-center gap-4 2xl:gap-0 lg:items-center bg-[#FFE6E6] font-DMSans px-10 lg:px-20">
            <div className="flex flex-col gap-3 text-left text-2xl w-[90%] 2xl:w-[50%] mt-64 lg:mt-0">
              <span className="">Welcome to</span>
              <span className="text-3xl w-full lg:text-6xl font-semibold">
                Digital Archival Platform
              </span>
              <span className="font-light">
                School of Arts and Design, Woxsen University
              </span>
              <Link
                href="/specialization"
                className="flex font-DMSans justify-between items-center w-3/4 md:w-1/2 lg:w-[50%] mt-5 text-base lg:text-2xl font-light tracking-tight p-5 lg:px-10 2xl:px-7 bg-[#D7616F] hover:bg-[#b14a56] text-white transition-all"
              >
                Explore Our Works
                <FaArrowRight className="w-[20%]" />
              </Link>
            </div>
            <div className="flex justify-end 2xl:justify-start hidden lg:block">
              <img src="/collage.png" className=" lg:w-[90%]" />
            </div>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
}
