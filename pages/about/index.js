"use client";

import React, { useState, useEffect } from "react";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function SemesterPage() {

  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center px-10 xl:py-12 xl:ml-24 font-Monstserrat">
        <span className="text-3xl lg:text-5xl font-bold mt-24">Welcome</span>
        <span className="text-xl lg:text-3xl font-light mt-2">
          the the Woxsen School of Design Archives
        </span>
        <span className="text-sm lg:text-xl font-normal mt-4 lg:mt-20 lg:w-[70%]">
          Welcome to the School of Design Archives, a visual journey through our
          rich design legacy. Delve into our captivating timeline, charting the
          evolution of design excellence at our university, from inception to
          the present day. Explore the profiles of our distinguished alumni,
          celebrate landmark design projects, and discover the invaluable
          contributions of our exceptional faculty. From awards and accolades to
          memorable exhibitions, this archival space is a testament to our
          commitment to preserving and showcasing the vibrant heritage of design
          education. Explore further, connect with us, and become part of our
          design narrative.
        </span>
        <span className="text-sm font-semibold mt-8 lg:w-[70%]">
          Welcome to the School of Design Archives, a visual journey through our
          rich design legacy.
        </span>

        <Footer />
      </div>
    </div>
  );
}
