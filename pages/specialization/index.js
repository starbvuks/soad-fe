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
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [session]);

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_TOKEN;

    const fetchData = async () => {
      const res = await axios.get("http://localhost:1338/api/specializations", {
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
            <span className="text-center text-5xl font-bold font-Monstserrat">
              School of Art & Design
            </span>
            <span className="text-center text-4xl font-medium font-Monstserrat">
              Digital Design Archive
            </span>
            <div className="grid grid-cols-5 text-center gap-7 self-center xl:px-12 xl:text-2xl xl:mt-28">
              {specializations.map((spec, index) => (
                <Link
                  href={{
                    pathname: `/ay`,
                    query: { specId: spec.id },
                  }}
                >
                  <motion.div
                    className="border-4 group border-slate-500  bg-slate-100 hover:scale-105 flex justify-center items-center px-8 py-32 h-full rounded-3xl"
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
