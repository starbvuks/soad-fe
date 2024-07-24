"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import Navbar from "../../components/Navbar";
import NavPath from "../../components/NavPath";
import Footer from "../../components/Footer";
import PdfViewer from "../../components/PdfViewer";
import Loading from "../loading";

export default function SemesterPage() {
  const [specializations, setSpecializations] = useState([]);
  const [media, setMedia] = useState("");
  const [ay, setAy] = useState("");
  const [course, setCourse] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const { specId, ayId, semId, courseId, projId } = router.query;

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_TOKEN;

    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://soad.alephinnovation.live/api/projects/${projId}?populate=*`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(res.data.data);

        setSpecializations(res.data.data.attributes);
        setMedia(res.data.data.attributes.projMedia.data[0].attributes.url);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData().then(() => {
      // After fetching data, wait for   1.5 seconds and then hide the loading screen
      setTimeout(() => {
        setIsLoading(false);
      }, 0);
    });
  }, [projId]);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <Navbar />
          <div className="bg-white flex flex-col justify-center lg:py-12 lg:pl-24 font-Monstserrat">
            <NavPath currentPath={router.pathname} />
            <span className="text-5xl font-bold mt-4">
              {specializations.projectName}
            </span>
            <div className="flex flex-col">
              <span className="text-3xl font-semibold mt-8">
                Course Details
              </span>
              <span className="text-xl font-normal mt-2">
                Number Of Days:{" "}
                <span className=" ml-1">{specializations.numberOfDays}</span>
              </span>
              <span className="text-xl font-normal mt-2">
                Faculty:{" "}
                <span className=" ml-1">{specializations.faculty}</span>
              </span>
              <span className="text-xl font-normal mt-2">
                Student(s):{" "}
                <span className=" ml-1">{specializations.studentNames}</span>
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
                <PdfViewer url={`${media}`} />
              ) : (
                <span>Project Loading</span>
              )}
            </div>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
}
