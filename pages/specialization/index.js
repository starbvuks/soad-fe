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
    "61aad129e20ecb1179d3e2e95fcbf091b2f37b9839200eec15f4220e12ac1175a8b7a116058a06f194d905422aec01024761570dfe46e5856d9ec1638512b85a2e594a9d7f4b65f2e3144c4a4fa24509d651c6383d3cef9586abaca01a3c62096a94930e4715030563f35e02120ff8456ab29d42c9001714306ea0d53431b2ac";

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
