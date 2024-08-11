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
          <div className="flex flex-col justify-center lg:py-12 lg:pl-24 font-Monstserrat">
            <NavPath currentPath={router.pathname} />
            <span className="text-5xl font-bold mt-6 mb-5">
              {specializations.projectName}
            </span>
            <div className="flex flex-col">
              <div className="flex w-5/6 gap-20">
                <div className="w-1/2 flex flex-col">
                  <span className="text-2xl font-medium mt-5 font-DMSans">
                    Brief description of the project
                  </span>
                  <span className="text-lg font-normal mt-2 font-DMSans">
                    {specializations.brief}
                  </span>
                  <span className="text-lg font-semibold mt-6 font-DMSans">
                    Keywords: {specializations.keywords}
                  </span>
                </div>
                <div className="flex flex-col items-start justify-center bg-slate-100 border-dashed border-2 px-8 py-5 rounded-lg">
                  <span className="text-2xl font-semibold border-b-1 border-dashed border-slate-500">
                    Course Details
                  </span>
                  <div className="" />
                  <span className="text-xl font-normal mt-2 font-DMSans">
                    Number Of Days:{" "}
                    <span className=" ml-1 font-DMSans">
                      {specializations.numberOfDays}
                    </span>
                  </span>
                  <span className="text-xl font-normal mt-2 font-DMSans">
                    Faculty:{" "}
                    <span className=" ml-1 font-semibold font-DMSans text-slate-600">
                      {specializations.faculty}
                    </span>
                  </span>
                  <span className="text-xl font-normal mt-2 font-DMSans">
                    Student(s):{" "}
                    <span className=" ml-1 font-semibold font-DMSans text-slate-600">
                      {specializations.studentNames}
                    </span>
                  </span>
                </div>
              </div>
              {media ? (
                <PdfViewer url={`${media}`} />
              ) : (
                ""
              )}
            </div>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
}
