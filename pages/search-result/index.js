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
          `https://soad.alephinnovation.live/api/projects?populate=*&filters[$or][0][students][$contains]=${searchTerm}&filters[$or][1][faculty][$contains]=${searchTerm}&filters[$or][2][keywords][$contains]=${searchTerm}&filters[$or][3][projectName][$contains]=${searchTerm}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setSearchResults(res.data.data);
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
      <div className="bg-white flex flex-col justify-center xl:py-12 xl:ml-24 font-Monstserrat">
        <Navbar />
        <span className="text-2xl text-black font-light mt-24">
          Search Results for "{searchTerm}"
        </span>
        <div className="flex flex-wrap gap-10 xl:text-2xl xl:mt-24 xl:mb-36">
          {searchResults.map((spec, index) => (
            <Link
              key={index}
              href={{
                pathname: "/projects",
                query: {
                  specId: spec.attributes.specialization.data.id,
                  ayId: spec.attributes.academic_year.data.id,
                  semId: spec.attributes.semester.data.id,
                  courseId: spec.attributes.course.data.id,
                  projId: spec.id
                },
              }}
            >
              <div className="transition border-4 border-slate-500 text-slate-500 bg-slate-100 hover:scale-105 hover:bg-slate-500 hover:text-white flex flex-col items-start px-24 py-16 h-full rounded-3xl ">
                <span className=" font-thin italic text-xl">
                  {spec.attributes.students}
                </span>
                <span className=" font-semibold">
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
