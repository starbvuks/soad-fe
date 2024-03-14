"use client";

import React from "react";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function SemesterPage() {
  return (
    <div>
      <Navbar />
      <div className="bg-white flex flex-col justify-center xl:py-12 xl:ml-24 font-Monstserrat">
        <span className="text-5xl font-bold mt-24">Reach out to us at:</span>
        <span className="text-2xl font-normal mt-20 w-[70%]">
          Phone: <span className="italic">&nbsp; +91 xxxxx-xxxxx</span>
        </span>
        <span className="text-2xl font-normal mt-3 w-[70%]">
          Email:
          <span className="italic"> &nbsp; contact@email.com</span>
        </span>

        <Footer />
      </div>
    </div>
  );
}
