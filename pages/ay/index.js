import axios from "axios";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import Navbar from "../../components/Navbar";
import NavPath from "../../components/NavPath";
import Footer from "../../components/Footer";
import Loading from "../loading";

export default function AcademicYearPage() {
  const [specializations, setSpecializations] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const { specId } = router.query;

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_TOKEN;

    const fetchData = async () => {
      if (!specId) return; // Ensure specId is available before fetching

      try {
        const res = await axios.get(
          `https://soad.alephinnovation.live/api/academic-years?populate=specialization&filters[specialization][id][$eq]=${specId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Extract the starting year from the batch string and sort by it
        const sortedSpecializations = res.data.data.sort((a, b) => {
          const yearPattern = /(\d{4}) - \d{4}/;
          const yearA = parseInt(a.attributes.ay.match(yearPattern)[1], 10);
          const yearB = parseInt(b.attributes.ay.match(yearPattern)[1], 10);
          return yearB - yearA; // Ascending order
        });

        setSpecializations(sortedSpecializations);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching
      }
    };

    fetchData();
  }, [specId]); // Add specId as a dependency

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <Navbar />
          <div className="flex flex-col justify-center py-12 mx-6 lg:mx-24 h-full font-Monstserrat">
            <NavPath currentPath={router.pathname} />
            <span className="text-3xl lg:text-5xl font-bold mt-4">Batch</span>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 text-base lg:text-2xl mt-7 lg:mt-24 font-Outfit">
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
                    <div className="relative transition border-2 lg:border-4 border-slate-500 text-slate-500 bg-slate-100 hover:bg-slate-500 hover:text-white hover:scale-105 flex flex-col justify-center items-center p-9 lg:px-20 lg:py-16 h-full rounded-3xl">
                      <span className="whitespace-nowrap font-medium">{spec.attributes.ay}</span>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
}
