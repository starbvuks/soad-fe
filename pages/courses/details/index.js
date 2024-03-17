"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import Link from "next/link";

import { useRouter } from "next/router";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Loading from "../../loading";

export default function SemesterPage() {
  const [specializations, setSpecializations] = useState([]);
  const [sem, setSem] = useState("");
  const [ay, setAy] = useState("");
  const [course, setCourse] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const { specId, ayId, semId, courseId } = router.query; // Get initial params

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_TOKEN;

    const fetchData = async () => {
      const res = await axios
        .get(
          `https://soad.alephinnovation.live/api/projects?populate=*&filters[specialization][id][$eq]=${specId}&filters[academic_year][id][$eq]=${ayId}&filters[semester][id][$eq]=${semId}&filters[course][id][$eq]=${courseId}`,
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
          );
          setAy(res.data.data[0].attributes.academic_year.data.attributes.ay);
          setCourse(res.data.data[0].attributes.course.data.attributes);
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
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <Navbar />
          <div className="bg-white flex flex-col justify-center xl:py-12 xl:ml-24 font-Monstserrat">
            <span className="text-5xl font-bold mt-24">
              {course.courseName}
            </span>
            <span className="text-2xl font-light mt-2">
              for Sem {sem}, {ay}
            </span>
            <span className="text-xl font-medium mt-12">
              Keywords: {course.keywords}
            </span>
            <span className="text-xl font-normal mt-2 w-[60%]">
              {course.courseDetails}
            </span>
            <div className="flex flex-wrap gap-10 xl:text-2xl xl:mt-24 xl:mb-36">
              {specializations.map((spec, index) => (
                <Link
                  href={{
                    pathname: `/projects`,
                    query: {
                      specId: specId,
                      ayId: ayId,
                      semId: semId,
                      courseId: courseId,
                      projId: spec.id,
                    },
                  }}
                >
                  <div className="transition border-4 border-slate-500 text-slate-500 bg-slate-100 hover:scale-105 hover:bg-slate-500 hover:text-white flex flex-col items-start px-24 py-16 h-full rounded-3xl ">
                    <span className=" font-thin italic text-xl">
                      {spec.attributes.students}
                    </span>
                    <span className=" font-semibold">
                      {spec.attributes.projectName}
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
