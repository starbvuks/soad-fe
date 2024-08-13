"use client";

import { motion } from "framer-motion";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaHouse } from "react-icons/fa6";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Carousel from "@/components/Carousel";

import Loading from "../loading";
export default function Page() {
  const [specializations, setSpecializations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [typedSequence, setTypedSequence] = useState("");

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

  const router = useRouter();
  useEffect(() => {
    const secretSequence = "sarvagwashere";

    const handleKeyPress = (event) => {
      const { key } = event;
      const newTypedSequence = typedSequence + key;

      if (newTypedSequence === secretSequence) {
        router.push("https://www.sarvag.me/");
        setTypedSequence("");
      } else if (!secretSequence.startsWith(newTypedSequence)) {
        setTypedSequence(key);
      } else {
        setTypedSequence(newTypedSequence);
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [typedSequence]);

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
  function getTextColor(specializationName) {
    const colors = {
      Foundation: "#EF767A",
      "Communication Design": "#D68FD6",
      "Fashion Design": "#FFDE55",
      "Industrial Design": "#75C9B7",
      "Interior Design": "#ABD699",
    };
    return colors[specializationName] || "#808080"; // Fallback to a gray color
  }

  function getSpecializationDescription(specializationName) {
    const descriptions = {
      Foundation: "FoD",
      "Communication Design": "Cd",
      "Fashion Design": "Fd",
      "Industrial Design": "IId",
      "Interior Design": "Id",
    };
    return descriptions[specializationName] || "";
  }

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <motion.div>
          <Navbar />
          <div className="bg-[#FAFAFA] flex flex-col justify-center font-DMSans pt-20">
            <div className="flex flex-col gap-1 tracking-tight font-Outfit">
              <span className="text-center text-red-700 text-3xl font-bold mt-6 lg:mt-[3%] lg:text-5xl">
                School of Art & Design
              </span>
              <span className="text-center text-neutral-900 text-2xl font-extralight lg:text-4xl">
                Digital Design Archive
              </span>
            </div>
            <div className="lg:mx-16 mt-12 lg:flex lg:flex-col gap-2 lg:gap-5">
              <span className="text-xl hidden lg:flex mx-6 lg:mx-0 lg:text-3xl font-medium tracking-tight">
                Our Expertise
              </span>
              <Carousel />
            </div>
            <div className="flex flex-col items-center lg:block lg:items-start mt-16 lg:mt-20 border-t-2 border-slate-200 bg-neutral-100 pt-6 lg:pt-9 pb-24">
              <span className="text-2xl text-slate-700 lg:text-3xl font-medium tracking-tight mx-6 lg:mx-16">
                Our Departments
              </span>
              <div className="grid grid-cols-2 gap-3 mx-6 lg:mx-16 mt-7 lg:mt-7 lg:flex lg:justify-between lg:gap-6">
                {specializations.map((spec, index) => (
                  <Link
                    key={spec.id}
                    href={{
                      pathname: `/ay`,
                      query: { specId: spec.id },
                    }}
                    className="w-full lg:w-1/5"
                  >
                    <div
                      className={`
                          group flex flex-col justify-center items-center h-[7.5em] lg:h-[10em] rounded-xl shadow-md lg:shadow-lg
                          transition-all duration-300 ease-linear hover:scale-105
                          hover:bg-[${getTextColor(
                            spec.attributes.specializationName
                          )}]
                        `}
                    >
                      <div
                        className={`text-center w-full h-full flex flex-col justify-center items-center p-4 rounded-lg border-2`}
                        style={{
                          borderColor: getTextColor(
                            spec.attributes.specializationName
                          ),
                        }}
                      >
                        <span
                          className={`
                              text-3xl lg:text-4xl font-medium tracking-tight
                              text-[${getTextColor(
                                spec.attributes.specializationName
                              )}]
                              group-hover:text-white group-hover:font-semibold
                            `}
                        >
                          {getSpecializationDescription(
                            spec.attributes.specializationName
                          )}
                        </span>
                        <span className="font-normal text-sm lg:text-base mt-1 text-slate-500 group-hover:font-medium group-hover:text-white">
                          {spec.attributes.specializationName}
                        </span>
                      </div>
                    </div>
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
