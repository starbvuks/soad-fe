import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";

export default function NavBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { data: session } = useSession();

  const token =
    "103e6597ead2beeddb04a4de897834c5b4bcb5d67382c4f2a33991e47130f696758518235d00a278a6d6ac461b0c5ce2089950c7db3dbbdb474a4b55acad3746096bf05ac0a22fee525fd6eae1033245315bf021295f28c843bbf3177a3909eacce7eb19f0b6f7a7cc096fe19df7b40f472413520e64e4f5ceb1f75208e373d8";

  useEffect(() => {
    const fetchSearchResults = async () => {
      const res = await axios
        .get(
          `http://localhost:1338/api/projects?filters[$or][0][students][$contains]=${searchTerm}&filters[$or][1][faculty][$contains]=${searchTerm}&filters[$or][2][keywords][$contains]=${searchTerm}&filters[$or][3][projectName][$contains]=${searchTerm}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setSearchResults(res.data.data);
          console.log(searchResults);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    if (searchTerm) {
      fetchSearchResults(searchTerm);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
    console.log("Dropdown state:", isDropdownOpen);
  };

  return (
    <header className="fixed top-0 font-Monstserrat left-0 w-full h-16 bg-white border-b-2 border-gray-200 z-50 flex justify-between items-center">
      <div className="flex items-center">
        <Link
          href="/"
          className="mx-4 text-2xl font-light italic tracking-tight"
        >
          SoAD <span className="font-semibold not-italic">Archive</span>
        </Link>
      </div>

      <div className="flex items-center w-[30%] space-x-4">
        <div className="relative w-[80%]">
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="w-full px-4 py-2 text-sm font-medium rounded-md bg-gray-100 border border-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search..."
            aria-label="Search"
          />

          <button className="absolute right-0 top-0 mt-2 mr-3">
            <FaSearch className="w-6 h-6 text-gray-400" />
          </button>

          {searchTerm ? (
            <div className="absolute right-0 top-10 mt-2 mr-3 z-20">
              {/* Map over the search results and render each item */}
              {searchResults.map((result) => (
                <div key={result.id}>
                  <span>{result.attributes.students}</span>
                  <span>{result.attributes.projectName}</span>
                </div>
              ))}
              {/* Button to clear the search term and go back to the initial screen */}
              <button onClick={() => setSearchTerm("")}>Clear Search</button>
            </div>
          ) : (
            <div></div>
          )}
        </div>

        <button
          id="hamburgerMenu"
          className="p-2"
          onClick={handleDropdownToggle}
        >
          <FaBars className="w-6 h-6 text-gray-400" />
        </button>

        <div
          id="dropdownMenu"
          className={`fixed top-0 right-0 border-2 border-gray-200 h-screen w-72 bg-[#f9f9f9] transform transition-all duration-300 ease-out ${
            isDropdownOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <button
            className="absolute top-0 right-0 m-4"
            onClick={handleDropdownToggle}
          >
            <FaTimes className="w-6 h-6 text-black" />
          </button>
          <nav className="py-2 flex flex-col  text-black font-semibold">
            <Link
              href="/about"
              className="mt-12 w-full p-4 text-center border-y-2 transition hover:text-white hover:bg-slate-600"
            >
              About
            </Link>
            <Link
              href="/contact"
              className=" w-full p-4 text-center border-b-2 transition hover:text-white hover:bg-slate-600"
            >
              Contact
            </Link>
            {session && (
              <button
                className="w-full p-4 text-red-500 transition hover:text-white hover:bg-red-600 border-b-2"
                onClick={() => signOut()}
              >
                Sign Out
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
