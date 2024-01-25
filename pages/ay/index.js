import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaCaretRight, FaCaretLeft } from "react-icons/fa";

import Navbar from "../../components/Navbar";

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
    "61aad129e20ecb1179d3e2e95fcbf091b2f37b9839200eec15f4220e12ac1175a8b7a116058a06f194d905422aec01024761570dfe46e5856d9ec1638512b85a2e594a9d7f4b65f2e3144c4a4fa24509d651c6383d3cef9586abaca01a3c62096a94930e4715030563f35e02120ff8456ab29d42c9001714306ea0d53431b2ac";

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
          Design Program
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
                  <div className="bg-slate-500 flex justify-center items-center px-12 py-32 h-full rounded-3xl">
                    <span className="text-white font-semibold">
                      {spec.attributes.ay}
                    </span>
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
    </div>
  );
}
