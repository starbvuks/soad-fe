"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function SemesterPage() {
  const [specializations, setSpecializations] = useState([]);
  const [sem, setSem] = useState("");
  const [ay, setAy] = useState("");

  const router = useRouter();
  const { specId, ayId, semId } = router.query; // Get initial params

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_TOKEN;

    const fetchData = async () => {
      const res = await axios
        .get(
          `https://soad.alephinnovation.live/api/courses?populate=*&filters[specialization][id][$eq]=${specId}&filters[academic_years][id][$eq]=${ayId}&filters[semester][id][$eq]=${semId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setSpecializations(res.data.data);
          setSem(
            res.data.data[0].attributes.semester.data.attributes.semesterNum
          ); // Access data directly
          setAy(
            res.data.data[0].attributes.academic_years.data[0].attributes.ay
          ); // Access data directly
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="bg-white flex flex-col justify-center xl:py-12 xl:ml-24 font-Monstserrat">
        <span className="text-5xl font-bold mt-24">Courses</span>
        <span className="text-2xl font-light mt-2">
          for Sem {sem}, {ay}
        </span>
        {/* <span className="text-center text-4xl font-medium">
        Digital design archive
      </span> */}
        <div className="flex flex-wrap gap-8 xl:text-2xl xl:mt-24">
          {specializations.map((spec, index) => (
            <div style={{}}>
              <Link
                href={{
                  pathname: `/courses/details`,
                  query: {
                    specId: specId,
                    ayId: ayId,
                    semId: semId,
                    courseId: spec.id,
                  },
                }}
              >
                <div className="transition border-4 border-slate-500 text-slate-500 bg-slate-100 hover:bg-slate-500 hover:text-white hover:scale-105 flex flex-col items-start px-20 py-16 h-full rounded-3xl ">
                  <span className=" font-thin italic text-xl">
                    {spec.attributes.courseCode}
                  </span>
                  <span className=" font-semibold">
                    {spec.attributes.courseName}
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
