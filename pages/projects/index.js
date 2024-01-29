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
    "61aad129e20ecb1179d3e2e95fcbf091b2f37b9839200eec15f4220e12ac1175a8b7a116058a06f194d905422aec01024761570dfe46e5856d9ec1638512b85a2e594a9d7f4b65f2e3144c4a4fa24509d651c6383d3cef9586abaca01a3c62096a94930e4715030563f35e02120ff8456ab29d42c9001714306ea0d53431b2ac";

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
