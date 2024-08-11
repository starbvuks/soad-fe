"use client";

import React from "react";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function SemesterPage() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center px-12 py-6 xl:py-12 xl:ml-24 font-Monstserrat">
        <span className="text-3xl lg:text-5xl font-semibold lg:font-bold mt-24">Reach out to us at:</span>
        <span className="text-xl lg:text-2xl font-normal mt-9 lg:mt-20 lg:w-[70%]">
          Phone: <span className="italic">&nbsp; +91 xxxxx-xxxxx</span>
        </span>
        <span className="text-xl lg:text-2xl font-normal mt-1 lg:w-[70%]">
          Email:
          <span className="italic"> &nbsp; contact@email.com</span>
        </span>

        <Footer />
      </div>
    </div>
  );
}
