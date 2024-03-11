"use client";

import { motion } from "framer-motion";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Loading from "../loading";

export default function Page() {
  const [specializations, setSpecializations] = useState([]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // const { data: session } = useSession();

  // useEffect(() => {
  //   if (!session) {
  //     router.push("/");
  //   }
  // }, [session]);

  useEffect(() => {
    const url = process.env.NEXTAUTH_URL;
    const token = process.env.NEXT_PUBLIC_TOKEN;

    // local token: 103e6597ead2beeddb04a4de897834c5b4bcb5d67382c4f2a33991e47130f696758518235d00a278a6d6ac461b0c5ce2089950c7db3dbbdb474a4b55acad3746096bf05ac0a22fee525fd6eae1033245315bf021295f28c843bbf3177a3909eacce7eb19f0b6f7a7cc096fe19df7b40f472413520e64e4f5ceb1f75208e373d8

    const fetchData = async () => {
      const res = await axios.get("http://ec2-54-84-35-62.compute-1.amazonaws.com:1337/api/specializations", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Define the order of specializations
      const specializationOrder = [
        "Foundation",
        "Communication Design",
        "Fashion Design",
        "Industrial Design",
        "Interior Design",
      ];

      // Sort the fetched specializations based on the defined order
      const sortedSpecializations = res.data.data.sort((a, b) => {
        return (
          specializationOrder.indexOf(a.attributes.specializationName) -
          specializationOrder.indexOf(b.attributes.specializationName)
        );
      });

      // Update the state with the sorted specializations
      setSpecializations(sortedSpecializations);
    };

    fetchData().then(() => {
      // After fetching data, wait for   1.5 seconds and then hide the loading screen
      setTimeout(() => {
        setIsLoading(false);
      }, 750);
    });
  }, []); // Empty dependency array

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
      "Foundation": "#EF767A",
      "Communication Design": "#D68FD6",
      "Fashion Design": "#FFE26A",
      "Industrial Design": "#75C9B7",
      "Interior Design": "#ABD699",
    };
    return colors[specializationName] || "defaultColor"; // Replace "defaultColor" with the default color if needed
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
          <div className="bg-[#f6f6f6] h-screen flex flex-col justify-center xl:py-12">
            <span className="text-center text-3xl font-bold font-Monstserrat xl:text-5xl">
              School of Art & Design
            </span>
            <span className="text-center text-2xl font-medium font-Monstserrat xl:text-4xl">
              Digital Design Archive
            </span>
            <div className="flex flex-wrap justify-center text-center self-center gap-3 mx-12 mt-24 xl:flex-nowrap xl:gap-7 xl:grid-cols-5 xl:px-12 xl:text-2xl xl:mt-28">
              {specializations.map((spec, index) => (
                <Link
                  href={{
                    pathname: `/ay`,
                    query: { specId: spec.id },
                  }}
                >
                  <motion.div
                    className="group border-slate-500 bg-slate-100 hover:scale-105 flex justify-center items-center w-44 h-32 rounded-xl border-2 xl:border-4 xl:px-28 xl:py-32 xl:rounded-3xl"
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: getBackgroundColor(
                        spec.attributes.specializationName
                      ),
                      color: "white",
                    }}
                    transition={{ type: "linear", stiffness: 500 }}
                  >
                    <span className="font-Monstserrat font-semibold text-slate-500 group-hover:text-white">
                      {spec.attributes.specializationName}
                    </span>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
          <Footer />
        </motion.div>
      )}
    </div>
  );
}
