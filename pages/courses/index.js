"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";

export default function SemesterPage() {
  const [specializations, setSpecializations] = useState([]);
  const [sem, setSem] = useState("");
  const [ay, setAy] = useState("");

  const router = useRouter();
  const { specId, ayId, semId } = router.query; // Get initial params

  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [session]);

  const token =
    "61aad129e20ecb1179d3e2e95fcbf091b2f37b9839200eec15f4220e12ac1175a8b7a116058a06f194d905422aec01024761570dfe46e5856d9ec1638512b85a2e594a9d7f4b65f2e3144c4a4fa24509d651c6383d3cef9586abaca01a3c62096a94930e4715030563f35e02120ff8456ab29d42c9001714306ea0d53431b2ac";

  useEffect(() => {
    // Fetch data on initial render and whenever params change
    const fetchData = async () => {
      const res = await axios
        .get(
          `http://localhost:1338/api/courses?populate=*&filters[specializations][id][$eq]=${specId}&filters[academic_years][id][$eq]=${ayId}&filters[semesters][id][$eq]=${semId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setSpecializations(res.data.data);
          setSem(
            res.data.data[0].attributes.semesters.data[0].attributes.semesterNum
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
          for Sem {sem}, Academic Year - {ay}
        </span>
        {/* <span className="text-center text-4xl font-medium">
        Digital design archive
      </span> */}
        <div className="flex gap-10 xl:text-2xl xl:mt-24">
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
              <div className="bg-slate-500 flex flex-col items-start px-24 py-16 h-full rounded-3xl ">
                <span className="text-white font-thin italic text-xl">
                  {spec.attributes.courseCode}
                </span>
                <span className="text-white font-semibold">
                  {spec.attributes.courseName}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}