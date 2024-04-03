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
      const res = await axios.get(
        `https://soad.alephinnovation.live/api/academic-years?populate=specialization*&filters[specialization][id][$eq]=${specId}`,
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
        return yearA - yearB; // Ascending order
      });

      setSpecializations(sortedSpecializations);
    };

    fetchData().then(() => {
      // After fetching data, wait for   1.5 seconds and then hide the loading screen
      setTimeout(() => {
        setIsLoading(false);
      }, 0);
    });
  }, []); // Empty dependency array

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <Navbar />
          <div className="bg-white flex flex-col justify-center xl:py-12 xl:mx-24 font-Monstserrat">
            <NavPath currentPath={router.pathname} />
            <span className="text-4xl ml-6 xl:text-5xl font-bold my-4 xl:ml-0 xl:mt-4">Batch</span>
            <div className="grid grid-cols-2 gap-4 mx-6 xl:mx-0 xl:grid-cols-3 xl:gap-8 xl:text-2xl xl:mt-24">
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
                    <div className="relative transition border-4 border-slate-500 text-slate-500 bg-slate-100 hover:bg-slate-500 hover:text-white hover:scale-105 flex flex-col justify-center items-center px-4 py-8 xl:px-20 xl:py-16 h-full rounded-xl xl:rounded-3xl">
                      <span className=" font-semibold">
                        {spec.attributes.ay}
                      </span>
                    </div>
                  </Link>
                ))}
            </div>
            {/* <button
            onClick={handleNext}
            className="px-4 py-2 h-12 bg-gray-500 text-white rounded-full"
          >
            <FaCaretRight />
          </button> */}
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
}
