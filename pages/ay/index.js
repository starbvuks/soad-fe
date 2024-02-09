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

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_TOKEN;
  
    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:1338/api/academic-years?populate=specialization&filters[specialization][id][$eq]=${specId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Sort the academic years by the year range
      const sortedSpecializations = res.data.data.sort((a, b) => {
        // Assuming 'ay' is a string like '2021-2022'
        const yearA = parseInt(a.attributes.ay.split('-')[0],  10);
        const yearB = parseInt(b.attributes.ay.split('-')[0],  10);
        return yearA - yearB; // Ascending order
      });
  
      setSpecializations(sortedSpecializations);
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
