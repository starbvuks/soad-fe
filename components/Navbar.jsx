import Link from "next/link";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { signOut, useSession } from "next-auth/react";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { useRouter } from "next/router";

export default function NavBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { data: session } = useSession();
  const router = useRouter();
  const searchRef = useRef();

  useEffect(() => {
    // Function to set the screen size state
    const handleResize = () => {
      setIsSmallScreen(window.matchMedia("(max-width:  768px)").matches);
    };

    // Initial check for screen size
    handleResize();

    // Event listener for resize
    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Redirect to the search results page with the search term as a URL parameter
    router.push(`/search-result?term=${encodeURIComponent(searchTerm)}`);
  };

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
        {isSmallScreen ? (
          <>
            <button onClick={handleSearchClick} className="p-2">
              <FaSearch className="w-6 h-6 text-gray-400" />
            </button>
            {isSearchOpen && (
              <div className="search-bar">
                <form onSubmit={handleSearchSubmit}>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    className="w-full px-4 py-2 text-sm font-medium rounded-md bg-gray-100 border border-gray-200 placeholder-gray-400 focus:outline focus:ring-2 focus:ring-gray-500"
                    placeholder="Search..."
                    aria-label="Search"
                  />
                  <button
                    type="submit"
                    className="absolute right-4 top-4 bottom-4 px-3 border-l-2 rounded-r-md bg-gray-200 border-gray-300 text-gray-400 transition hover:text-gray-600 hover:border-gray-400 hover:bg-gray-400"
                  >
                    <FaSearch className="w-6 h-6" />
                  </button>
                </form>
              </div>
            )}
          </>
        ) : (
          <div className="relative w-[80%]">
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="w-full px-4 py-2 text-sm font-medium rounded-md bg-gray-100 border border-gray-200 placeholder-gray-400 focus:outline focus:ring-2 focus:ring-gray-500 "
                placeholder="Search..."
                aria-label="Search"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 bottom-0 px-3 border-l-2 rounded-r-md bg-gray-200 border-gray-300 text-gray-400 transition hover:text-gray-600 hover:border-gray-400 hover:bg-gray-400"
              >
                <FaSearch className="w-6 h-6" />
              </button>
            </form>
          </div>
        )}

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
