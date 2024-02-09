"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

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
      }, 1200);
    });
  }, []); // Empty dependency array

  return (
    <div>
      {isLoading ? (
        <div className="flex h-screen items-center align-center justify-center">
          <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-gray-500"></div>
        </div>
      ) : (
        <div>
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
                  <div className="transition border-4 border-slate-500 text-slate-500 bg-slate-100 hover:scale-105 hover:bg-slate-500  hover:text-white flex justify-center items-center px-8 py-32 h-full rounded-3xl">
                    <span className=" font-Monstserrat font-semibold">
                      {spec.attributes.specializationName}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
}
