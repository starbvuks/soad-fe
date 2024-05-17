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
          <div className="bg-[#FAFAFA] flex flex-col justify-center font-WorkSans xl:pt-20 xl:pb-44">
            <div className="flex flex-col gap- tracking-tight">
              <span className="text-center text-black text-2xl font-bold mt-9 xl:mt-[3%] xl:text-5xl">
                School of Art & Design
              </span>
              <span className="text-center text-black text-xl font-light xl:text-4xl">
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
              <div className="flex flex-wrap justify-center text-center self-center gap-3 mx-12 xl:flex-nowrap xl:gap-6 xl:grid-cols-5 xl:mx-12 mt-5 xl:text-2xl">
                {specializations.map((spec, index) => (
                  <Link
                    key={spec.id}
                    href={{
                      pathname: `/ay`,
                      query: { specId: spec.id },
                    }}
                  >
                    <motion.div
                      className="group flex flex-col justify-start items-center bg-opacity-20 hover:scale-105 w-[10em] h-24 xl:min-h-[6em] rounded-xl shadow-md"
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: getBackgroundColor(
                          spec.attributes.specializationName
                        ),
                        color: "black",
                      }}
                      transition={{ type: "linear", stiffness: 500 }}
                    >
                      <div className="text-left min-h-[45%] w-full flex flex-col p-4 xl:rounded-t-3xl">
                        <span className="font-medium text-slate-500 group-hover:text-white  group-hover:font-semibold">
                          {spec.attributes.specializationName}
                        </span>
                        <span className="font-light text-sm mt-1 group-hover:text-slate-100 text-slate-500 ">
                          {getSpecializationDescription(
                            spec.attributes.specializationName
                          )}
                        </span>
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
