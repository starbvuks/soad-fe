import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaCaretRight, FaCaretLeft } from "react-icons/fa";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function AcademicYearPage() {
  const [specializations, setSpecializations] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const { specId } = router.query;
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
        `http://localhost:1338/api/academic-years?populate=specialization&filters[specialization][id][$eq]=${specId}`,
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

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 4, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 4, specializations.length - 4)
    );
  };

  return (
    <div>
      <Navbar />
      <div className="bg-white flex flex-col justify-center xl:py-12 font-Monstserrat">
        <span className="text-center text-5xl font-bold mt-24">
          Academic Year
        </span>
        <div className="flex items-center justify-center gap-10 xl:px-12 xl:text-2xl xl:mt-32">
          <button
            onClick={handlePrevious}
            className="px-4 py-2 h-12 bg-gray-500 text-white rounded-full"
          >
            {" "}
            <FaCaretLeft />{" "}
          </button>
          <div className="grid grid-cols-4 gap-4 transition-transform duration-500 ease-in-out">
            {specializations
              .slice(currentIndex, currentIndex + 4)
              .map((spec, index) => (
                <Link
                  key={index}
                  href={{
                    pathname: `/sem`,
                    query: { specId: specId, ayId: spec.id },
                  }}
                >
                  <div className="transition border-4 border-slate-500 text-slate-500 bg-slate-100 hover:scale-105 hover:bg-slate-500 hover:text-white flex justify-center items-center px-12 py-32 h-full rounded-3xl">
                    <span className=" font-semibold">{spec.attributes.ay}</span>
                  </div>
                </Link>
              ))}
          </div>
          <button
            onClick={handleNext}
            className="px-4 py-2 h-12 bg-gray-500 text-white rounded-full"
          >
            <FaCaretRight />
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
