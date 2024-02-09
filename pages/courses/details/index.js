"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

import { useRouter } from "next/router";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

export default function SemesterPage() {
  const [specializations, setSpecializations] = useState([]);
  const [sem, setSem] = useState("");
  const [ay, setAy] = useState("");
  const [course, setCourse] = useState("");

  const router = useRouter();
  const { specId, ayId, semId, courseId } = router.query; // Get initial params

  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [session]);

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_TOKEN;

    const fetchData = async () => {
      const res = await axios
        .get(
          `http://localhost:1338/api/projects?populate=*&filters[specializations][id][$eq]=${specId}&filters[academic_years][id][$eq]=${ayId}&filters[semesters][id][$eq]=${semId}&filters[course][id][$eq]=${courseId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setSpecializations(res.data.data);
          console.log(
            res.data.data[0].attributes.semesters.data.attributes.semesterNum
          );
          setSem(
            res.data.data[0].attributes.semesters.data.attributes.semesterNum
          ); // Access data directly
          setAy(res.data.data[0].attributes.academic_years.data.attributes.ay); // Access data directly
          setCourse(res.data.data[0].attributes.course.data.attributes); // Access data directly
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
        <span className="text-5xl font-bold mt-24">{course.courseName}</span>
        <span className="text-2xl font-light mt-2">
          for Sem {sem}, Academic Year - {ay}
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
  );
}
