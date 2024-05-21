"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import Navbar from "../../components/Navbar";
import NavPath from "../../components/NavPath";
import Footer from "../../components/Footer";
import Loading from "../loading";

export default function SemesterPage() {
  const [specializations, setSpecializations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const { specId, ayId } = router.query;

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_TOKEN;

    const fetchData = async () => {
      const res = await axios.get(
        `https://soad.alephinnovation.live/api/semesters?populate=*&filters[specializations][id][$eq]=${specId}&filters[academic_years][id][$eq]=${ayId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Extract the numerical part of the semesterNum and sort by that
      const sortedSpecializations = res.data.data.sort((a, b) => {
        const semesterNumA = parseInt(
          a.attributes.semesterNum.replace("Sem ", ""),
          10
        );
        const semesterNumB = parseInt(
          b.attributes.semesterNum.replace("Sem ", ""),
          10
        );
        return semesterNumB - semesterNumA; // Ascending order
      });

      setSpecializations(sortedSpecializations);
    };

    fetchData().then(() => {
      // After fetching data, wait for   1.5 seconds and then hide the loading screen
      setTimeout(() => {
        setIsLoading(false);
      }, 0);
    });
  }, []); // Empty dependency array

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <Navbar />
          <div className="bg-white flex flex-col justify-center xl:py-12 xl:mx-24 font-Monstserrat">
            <NavPath currentPath={router.pathname} />
            <span className="text-5xl font-bold mt-4">Semester</span>
            {/* <span className="text-center text-4xl font-medium">
        Digital design archive
      </span> */}
            <div className="grid grid-cols-4 gap-8 xl:text-2xl xl:mt-24">
              {specializations.map((spec, index) => (
                <Link
                  href={{
                    pathname: `/courses`,
                    query: { specId: specId, ayId: ayId, semId: spec.id },
                  }}
                >
                  <div className="relative transition border-4 border-slate-500 text-slate-500 bg-slate-100 hover:bg-slate-500 hover:text-white hover:scale-105 flex flex-col justify-center items-center px-20 py-16 h-full rounded-3xl ">
                    <span className=" font-semibold">
                      Sem {spec.attributes.semesterNum}
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
