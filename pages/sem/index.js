"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function SemesterPage() {
  const [specializations, setSpecializations] = useState([]);
  const router = useRouter();
  const { specId, ayId } = router.query;
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      router.push("/");
    }

    if (!specId) {
      router.push("/specialization");
    }
  }, [session]);

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_TOKEN;

    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:1338/api/semesters?populate=*&filters[specializations][id][$eq]=${specId}&filters[academic_years][id][$eq]=${ayId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    
      // Extract the numerical part of the semesterNum and sort by that
      const sortedSpecializations = res.data.data.sort((a, b) => {
        const semesterNumA = parseInt(a.attributes.semesterNum.replace('Sem ', ''),  10);
        const semesterNumB = parseInt(b.attributes.semesterNum.replace('Sem ', ''),  10);
        return semesterNumA - semesterNumB; // Ascending order
      });
    
      setSpecializations(sortedSpecializations);
    };    

    fetchData();
  }, []); // Empty dependency array

  

  return (
    <div>
      <Navbar />
      <div className="bg-white flex flex-col justify-center xl:py-12 font-Monstserrat">
        <span className="text-center text-5xl font-bold mt-24">Semester</span>
        {/* <span className="text-center text-4xl font-medium">
        Digital design archive
      </span> */}
        <div className="flex justify-center text-center gap-10 xl:px-12 xl:text-2xl xl:mt-32">
          {specializations.map((spec, index) => (
            <Link
              href={{
                pathname: `/courses`,
                query: { specId: specId, ayId: ayId, semId: spec.id },
              }}
            >
              <div className="transition border-4 border-slate-500 text-slate-500 bg-slate-100 hover:scale-105 hover:bg-slate-500 hover:text-white flex justify-center items-center px-12 py-24 h-full rounded-3xl">
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
  );
}
