"use client";

import { motion } from "framer-motion";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Carousel from "@/components/Carousel";

import Loading from "../loading";
export default function Page() {
  const [specializations, setSpecializations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const url = process.env.NEXTAUTH_URL;
    const token = process.env.NEXT_PUBLIC_TOKEN;

    const fetchData = async () => {
      const res = await axios.get(
        "https://soad.alephinnovation.live/api/specializations?populate=*",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const specializationOrder = [
        "Foundation",
        "Communication Design",
        "Fashion Design",
        "Industrial Design",
        "Interior Design",
      ];

      const sortedSpecializations = res.data.data.sort((a, b) => {
        return (
          specializationOrder.indexOf(a.attributes.specializationName) -
          specializationOrder.indexOf(b.attributes.specializationName)
        );
      });

      setSpecializations(sortedSpecializations);
    };

    fetchData().then(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    });
  }, []);

  const pageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  };

  const pageTransition = {
    type: "spring",
    mass: 0.5,
    damping: 25,
    stiffness: 90,
  };

  function getBackgroundColor(specializationName) {
    const colors = {
      Foundation: "#EF767A",
      "Communication Design": "#D68FD6",
      "Fashion Design": "#FFDE55",
      "Industrial Design": "#75C9B7",
      "Interior Design": "#ABD699",
    };
    return colors[specializationName] || "defaultColor";
  }

  function getSpecializationDescription(specializationName) {
    const descriptions = {
      Foundation: "Focuses on foundational design principles.",
      "Communication Design": "Creates visual messages across mediums.",
      "Fashion Design":
        "Designs clothing and accessories with style and function.",
      "Industrial Design":
        "Designs functional and aesthetically pleasing products.",
      "Interior Design":
        "Enhances interior spaces for aesthetics and function.",
    };
    return descriptions[specializationName] || "";
  }

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={pageVariants}
          transition={pageTransition}
        >
          <Navbar />
          <div className="bg-[#FAFAFA] flex flex-col justify-center font-WorkSans lg:pt-20 lg:pb-44">
            <div className="flex flex-col gap-1 tracking-tight">
              <span className="text-center text-black text-2xl font-bold mt-9 lg:mt-[3%] lg:text-5xl">
                School of Art & Design
              </span>
              <span className="text-center text-black text-xl font-light lg:text-4xl">
                Digital Design Archive
              </span>
            </div>
            <div className="mx-16 mt-12 flex flex-col gap-5">
              <span className="text-2xl font-semibold tracking-tight">
                Student Gallery
              </span>
              <Carousel />
            </div>
            <div className="mt-20">
              <span className="text-2xl font-semibold tracking-tight mx-16">
                Our Departments
              </span>
              <div className="flex flex-wrap justify-center text-center self-center gap-3 mx-12 lg:flex-nowrap lg:gap-6 lg:grid-cols-5 lg:mx-12 mt-5 lg:text-2xl">
                {specializations.map((spec, index) => (
                  <Link
                    key={spec.id}
                    href={{
                      pathname: `/ay`,
                      query: { specId: spec.id },
                    }}
                  >
                    <motion.div
                      className="group flex flex-col justify-start items-center bg-opacity-20 hover:scale-105 w-[9em] h-[6.5em] xl:w-[10em] xl:min-h-[6em] rounded-xl shadow-lg shadow-center"
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: getBackgroundColor(
                          spec.attributes.specializationName
                        ),
                        color: "black",
                      }}
                      transition={{ type: "linear", stiffness: 500 }}
                    >
                      <div className="text-center w-full h-full flex flex-col justify-center items-center p-4 lg:rounded-xl border-2 border-slate-300">
                        <span className="font-medium text-slate-500 group-hover:text-white group-hover:font-semibold tracking-tight">
                          {spec.attributes.specializationName}
                        </span>
                        {/* <span className="font-light text-sm mt-1 group-hover:text-slate-100 text-slate-500 ">
                          {getSpecializationDescription(
                            spec.attributes.specializationName
                          )}
                        </span> */}
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <Footer />
        </motion.div>
      )}
    </div>
  );
}
