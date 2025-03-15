"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import Navbar from "../../components/Navbar";
import NavPath from "../../components/NavPath";
import Footer from "../../components/Footer";
import Loading from "../loading";

export default function CoursesPage() {
  const [specializations, setSpecializations] = useState([]);
  const [sem, setSem] = useState("");
  const [ay, setAy] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const { specId, ayId, semId } = router.query; // Get initial params

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_TOKEN;

    const fetchData = async () => {
      const res = await axios
        .get(
          `https://admin.soad.co.in/api/courses?populate=*&filters[specialization][id][$eq]=${specId}&filters[academic_years][id][$eq]=${ayId}&filters[semester][id][$eq]=${semId}`,
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

    fetchData().then(() => {
      // After fetching data, wait for   1.5 seconds and then hide the loading screen
      setTimeout(() => {
        setIsLoading(false);
      }, 0);
    });
  }, [specId, ayId, semId]);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <Navbar />
          <div className="flex flex-col justify-center py-6 lg:py-12 mx-6 lg:mx-24 font-Monstserrat">
            <NavPath currentPath={router.pathname} />
            <span className="text-3xl lg:text-5xl font-bold mt-4">Courses</span>
            <span className="text-lg lg:text-2xl font-base lg:font-light mt-1">
              for Sem {sem}, {ay}
            </span>

            <div className="grid grid-cols-2 gap-3 lg:gap-8 text-base lg:text-2xl mt-7 lg:mt-24 font-Outfit">
              {specializations.map((spec, index) => (
                <div>
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
                    <div className="relative transition border-2 lg:border-4 border-slate-500 text-slate-500 bg-slate-100 hover:bg-slate-500 hover:text-white hover:scale-105 flex flex-col justify-center items-center p-9 lg:px-20 lg:py-16 h-full rounded-3xl ">
                      <span className="absolute left-5 top-2 font-light lg:font-extralight italic text-xs lg:text-base">
                        {spec.attributes.courseCode}
                      </span>
                      <span className=" font-medium">
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
      )}
    </div>
  );
}
