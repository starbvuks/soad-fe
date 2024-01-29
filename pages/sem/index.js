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
    "61aad129e20ecb1179d3e2e95fcbf091b2f37b9839200eec15f4220e12ac1175a8b7a116058a06f194d905422aec01024761570dfe46e5856d9ec1638512b85a2e594a9d7f4b65f2e3144c4a4fa24509d651c6383d3cef9586abaca01a3c62096a94930e4715030563f35e02120ff8456ab29d42c9001714306ea0d53431b2ac";

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
              <div className="bg-slate-500 flex justify-center items-center px-12 py-32 h-full rounded-3xl">
                <span className="text-white font-semibold">
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
