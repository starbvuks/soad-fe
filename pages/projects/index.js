"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PdfViewer from "../../components/PdfViewer";

export default function SemesterPage() {
  const [specializations, setSpecializations] = useState([]);
  const [media, setMedia] = useState("");
  const [ay, setAy] = useState("");
  const [course, setCourse] = useState("");

  const router = useRouter();
  const { specId, ayId, semId, courseId } = router.query;

  const token =
    "103e6597ead2beeddb04a4de897834c5b4bcb5d67382c4f2a33991e47130f696758518235d00a278a6d6ac461b0c5ce2089950c7db3dbbdb474a4b55acad3746096bf05ac0a22fee525fd6eae1033245315bf021295f28c843bbf3177a3909eacce7eb19f0b6f7a7cc096fe19df7b40f472413520e64e4f5ceb1f75208e373d8";

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
          setSpecializations(res.data.data[0].attributes);
          console.log(specializations)
          setMedia(
            res.data.data[0].attributes.projMedia.data[0].attributes.url
          );
          // setSem(
          //   res.data.data[0].attributes.semesters.data[0].attributes.semesterNum
          // );
          // setAy(
          //   res.data.data[0].attributes.academic_years.data[0].attributes.ay
          // );
          // setCourse(res.data.data[0].attributes.course.data.attributes);
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
        <span className="text-5xl font-bold mt-24">
          {specializations.projectName}
        </span>
        <div className="flex flex-col">
          <span className="text-3xl font-semibold mt-8">Course Details</span>
          <span className="text-xl font-normal mt-2">
            Number Of Days:{" "}
            <span className=" ml-1">{specializations.numberOfDays}</span>
          </span>
          <span className="text-xl font-normal mt-2">
            Faculty: <span className=" ml-1">{specializations.faculty}</span>
          </span>
          <span className="text-xl font-normal mt-2">
            Student(s):{" "}
            <span className=" ml-1">{specializations.students}</span>
          </span>
          <span className="text-3xl font-semibold mt-12">
            Brief description of the project
          </span>
          <span className="text-lg font-semibold mt-8">
            Keywords: {specializations.keywords}
          </span>
          <span className="text-xl font-normal mt-2 w-[60%]">
            {specializations.brief}
          </span>
          {media ? (
            <PdfViewer url={`http://localhost:1338${media}`} />
          ) : (
            <br></br>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
