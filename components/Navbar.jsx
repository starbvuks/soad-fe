import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { useRouter } from "next/router";

export default function NavBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { data: session } = useSession();
  const router = useRouter();
  const searchRef = useRef();

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
    router.push(`/search-result?term=${encodeURIComponent(searchTerm)}`);
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full h-[4.5rem] bg-white border-b-2 border-gray-200 z-50 flex justify-between items-center font-DMSans">
      <div className="flex items-center">
        <Link
          href="/"
          className="mx-4 text-2xl font-light italic tracking-tight"
        >
          <img src="/wox-logo.png" alt="logo" className="w-24" />
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative hidden lg:block">
          <form onSubmit={handleSearchSubmit} className="flex items-center">
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="px-4 py-2.5 text-sm font-medium rounded-full bg-gray-100 border border-gray-200 placeholder-gray-400 focus:outline focus:ring-2 focus:ring-gray-500 w-[300px]"
              placeholder="Search..."
              aria-label="Search"
            />
            <button
              type="submit"
              className="p-3 ml-2 rounded-full bg-[#FFAAAA] text-[#E9E9E9] transition hover:text-[#cfcfcf] hover:bg-[#ff8585]"
            >
              <FaSearch className="w-4 h-4" />
            </button>
          </form>
        </div>

        <nav className="hidden lg:flex space-x-8 pl-3 pr-8">
          <Link
            href="/gallery"
            className="text-black font-medium transition hover:text-gray-600"
          >
            Gallery
          </Link>
          <Link
            href="/about"
            className="text-black font-medium transition hover:text-gray-600"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-black font-medium transition hover:text-gray-600"
          >
            Contact
          </Link>
        </nav>

        <button className="lg:hidden p-2" onClick={handleDropdownToggle}>
          <FaBars className="w-6 h-6 text-gray-400" />
        </button>

        <div
          className={`fixed top-0 right-0 h-screen w-72 bg-[#f9f9f9] border-l-2 border-gray-200 transition-transform transform ${
            isDropdownOpen ? "translate-x-0" : "translate-x-full"
          } lg:hidden`}
        >
          <button
            className="absolute top-4 right-4"
            onClick={handleDropdownToggle}
          >
            <FaTimes className="w-6 h-6 text-black" />
          </button>
          <nav className="flex flex-col items-center mt-16 space-y-4">
            <Link
              href="/gallery"
              className="w-full p-4 text-center border-b-2 transition hover:text-white hover:bg-slate-600"
            >
              Gallery
            </Link>
            <Link
              href="/about"
              className="w-full p-4 text-center border-b-2 transition hover:text-white hover:bg-slate-600"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="w-full p-4 text-center border-b-2 transition hover:text-white hover:bg-slate-600"
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
