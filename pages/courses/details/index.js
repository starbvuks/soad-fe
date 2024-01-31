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

  const token =
    "61aad129e20ecb1179103e6597ead2beeddb04a4de897834c5b4bcb5d67382c4f2a33991e47130f696758518235d00a278a6d6ac461b0c5ce2089950c7db3dbbdb474a4b55acad3746096bf05ac0a22fee525fd6eae1033245315bf021295f28c843bbf3177a3909eacce7eb19f0b6f7a7cc096fe19df7b40f472413520e64e4f5ceb1f75208e373d8d3e2e95fcbf091b2f37b9839200eec15f4220e12ac1175a8b7a116058a06f194d905422aec01024761570dfe46e5856d9ec1638512b85a2e594a9d7f4b65f2e3144c4a4fa24509d651c6383d3cef9586abaca01a3c62096a94930e4715030563f35e02120ff8456ab29d42c9001714306ea0d53431b2ac";

  useEffect(() => {
    // Fetch data on initial render and whenever params change
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
        <div className="flex gap-10 xl:text-2xl xl:mt-24 xl:mb-36">
          {specializations.map((spec, index) => (
            <Link
              href={{
                pathname: `/projects`,
                query: {
                  specId: specId,
                  ayId: ayId,
                  semId: semId,
                  courseId: spec.id,
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
