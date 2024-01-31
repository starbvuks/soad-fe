"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function SemesterPage() {
  const [specializations, setSpecializations] = useState([]);
  const router = useRouter();
  const { specId, ayId } = router.query;
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      router.push("/");
    }

    if (!specId) {
      router.push("/specialization");
    }
  }, [session]);

  const token =
    "103e6597ead2beeddb04a4de897834c5b4bcb5d67382c4f2a33991e47130f696758518235d00a278a6d6ac461b0c5ce2089950c7db3dbbdb474a4b55acad3746096bf05ac0a22fee525fd6eae1033245315bf021295f28c843bbf3177a3909eacce7eb19f0b6f7a7cc096fe19df7b40f472413520e64e4f5ceb1f75208e373d8";

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:1338/api/semesters?populate=*&filters[specializations][id][$eq]=${specId}&filters[academic_years][id][$eq]=${ayId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSpecializations(res.data.data);
    };

    fetchData();
  }, []); // Empty dependency array

  return (
    <div>
      <Navbar />
      <div className="bg-white flex flex-col justify-center xl:py-12 font-Monstserrat">
        <span className="text-center text-5xl font-bold mt-24">Semester</span>
        {/* <span className="text-center text-4xl font-medium">
        Digital design archive
      </span> */}
        <div className="flex justify-center text-center gap-10 xl:px-12 xl:text-2xl xl:mt-32">
          {specializations.map((spec, index) => (
            <Link
              href={{
                pathname: `/courses`,
                query: { specId: specId, ayId: ayId, semId: spec.id },
              }}
            >
              <div className="transition border-4 border-slate-500 text-slate-500 bg-slate-100 hover:scale-105 hover:bg-slate-500 hover:text-white flex justify-center items-center px-12 py-24 h-full rounded-3xl">
                <span className=" font-semibold">
                  Sem {spec.attributes.semesterNum}
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
