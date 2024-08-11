import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import axios from "axios";

const SearchResultsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const router = useRouter();

  // Extract the search term from the URL query parameters
  useEffect(() => {
    setSearchTerm(router.query.term || "");
  }, [router.query.term]);

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_TOKEN;

    const fetchSearchResults = async () => {
      const res = await axios
        .get(
          `https://soad.alephinnovation.live/api/projects?populate=*&filters[$or][0][studentNames][$contains]=${searchTerm}&filters[$or][1][faculty][$contains]=${searchTerm}&filters[$or][2][keywords][$contains]=${searchTerm}&filters[$or][3][projectName][$contains]=${searchTerm}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setSearchResults(res.data.data);
          console.log(res.data.data)
        })
        .catch((error) => {
          console.log(error);
        });
    };

    if (searchTerm) {
      fetchSearchResults();
      console.log(searchResults)
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  return (
    <div>
      <div className="flex flex-col justify-center xl:p-12 font-Monstserrat">
        <Navbar />
        <span className="text-2xl text-black font-light mt-24 border-b-3 border-dashed pb-6">
          Search Results For <span className="font-normal">"{searchTerm}"</span>
        </span>
            <div className="grid grid-cols-2 gap-8 font-Outfit xl:text-2xl xl:mt-10">
              {searchResults.map((spec, index) => (
                <Link
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
                  <div className="relative transition border-4 border-slate-500 text-slate-500 bg-slate-100 hover:bg-slate-500 hover:text-white hover:scale-105 flex flex-col justify-center px-20 py-16 h-full rounded-3xl ">
                    <span className=" font-extralight italic text-base">
                      {spec.attributes.studentNames}
                    </span>
                    <span className=" font-medium">
                      {spec.attributes.projectName}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;
