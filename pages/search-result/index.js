import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Spinner } from "@nextui-org/react";
import Navbar from "../../components/Navbar";
import axios from "axios";

const SearchResultsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setSearchTerm(router.query.term || "");
  }, [router.query.term]);

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_TOKEN;

    const fetchSearchResults = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `https://admin.soad.co.in/api/projects?populate=*&filters[$or][0][studentNames][$contains]=${searchTerm}&filters[$or][1][faculty][$contains]=${searchTerm}&filters[$or][2][keywords][$contains]=${searchTerm}&filters[$or][3][projectName][$contains]=${searchTerm}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSearchResults(res.data.data);
        console.log(res.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (searchTerm) {
      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  return (
    <div>
      <div className="flex flex-col justify-center p-6 xl:p-12 font-Monstserrat">
        <Navbar />
        <span className="text-lg lg:text-2xl text-black font-light mt-24 border-b-3 border-dashed pb-6">
          Search Results For <span className="font-normal">"{searchTerm}"</span>
        </span>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner color="primary" size="lg" className="z-100 pt-6" />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 lg:gap-8 font-Outfit mt-8 xl:text-2xl xl:mt-10">
            {searchResults.map((spec, index) => (
              <Link
                key={spec.id}
                href={{
                  pathname: `/projects`,
                  query: {
                    specId: spec.attributes.specialization.data.id,
                    semId: spec.attributes.semester.data.id,
                    ayId: spec.attributes.academic_year.data.id,
                    courseId: spec.attributes.course.data.id,
                    projId: spec.id
                  },
                }}
              >
                <div className="relative font-Outfit transition border-2 lg:border-4 border-slate-500 text-slate-500 bg-slate-100 hover:bg-slate-500 hover:text-white hover:scale-105 flex flex-col justify-center py-9 px-4 lg:px-20 lg:py-16 h-full rounded-xl lg:rounded-3xl">
                  <span className="font-light italic text-xs lg:text-base">
                    {spec.attributes.studentNames}
                  </span>
                  <span className="font-semibold">
                    {spec.attributes.projectName}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;