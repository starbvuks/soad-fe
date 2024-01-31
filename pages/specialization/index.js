"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Page() {
  const [specializations, setSpecializations] = useState([]);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [session]);

  const token =
    "103e6597ead2beeddb04a4de897834c5b4bcb5d67382c4f2a33991e47130f696758518235d00a278a6d6ac461b0c5ce2089950c7db3dbbdb474a4b55acad3746096bf05ac0a22fee525fd6eae1033245315bf021295f28c843bbf3177a3909eacce7eb19f0b6f7a7cc096fe19df7b40f472413520e64e4f5ceb1f75208e373d8"

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:1338/api/specializations", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSpecializations(res.data.data);
    };

    fetchData();
  }, []); // Empty dependency array

  return (
    <div>
      <Navbar />
      <div className="bg-[#f6f6f6] h-screen flex flex-col justify-center xl:py-12">
        <span className="text-center text-5xl font-bold font-Monstserrat">
          School of Art & Design
        </span>
        <span className="text-center text-4xl font-medium font-Monstserrat">
          Digital Design Archive
        </span>
        <div className="grid grid-cols-5 text-center gap-7 self-center xl:px-12 xl:text-2xl xl:mt-28">
          {specializations.map((spec, index) => (
            <Link
              href={{
                pathname: `/ay`,
                query: { specId: spec.id },
              }}
            >
              <div className="transition border-4 border-slate-500 text-slate-500 bg-slate-100 hover:scale-105 hover:bg-slate-500  hover:text-white flex justify-center items-center px-8 py-32 h-full rounded-3xl">
                <span className=" font-Monstserrat font-semibold">
                  {spec.attributes.specializationName}
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
