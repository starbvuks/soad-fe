import Link from "next/link";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";

export default function NavBar() {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
    console.log("Dropdown state:", isDropdownOpen);
  };

  return (
    <header className="fixed top-0 font-Monstserrat left-0 w-full h-16 bg-white border-b-2 border-gray-200 z-50 flex justify-between items-center">
      <div className="flex items-center">
        <Link href="/" className="mx-4 text-2xl font-bold">
          Logo
        </Link>
      </div>

      <div className="flex items-center w-[30%] space-x-4">
        <div className="relative w-[80%]">
          <input
            type="text"
            className="w-full px-4 py-2 text-sm font-medium rounded-md bg-gray-100 border border-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search..."
            aria-label="Search"
          />
          <button className="absolute right-0 top-0 mt-2 mr-3">
            <FaSearch className="w-6 h-6 text-gray-400" />
          </button>
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
          className={`fixed top-0 right-0 border-2 border-gray-200 h-screen w-64 bg-[#f9f9f9] transform transition-all duration-300 ease-out ${
            isDropdownOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <button
            className="absolute top-0 right-0 m-4"
            onClick={handleDropdownToggle}
          >
            <FaTimes className="w-6 h-6 text-black" />
          </button>
          <nav className="px-4 py-2 flex flex-col space-y-2 text-black font-semibold gap-5">
            <Link
              href="/about"
              className="mt-12 border-2 w-full border-black rounded-full p-2 text-center"
            >
              About
            </Link>
            <Link
              href="/contact"
              className=" border-2 w-full border-black rounded-full p-2 text-center"
            >
              Contact
            </Link>
            {session && (
              <button
                className="w-full p-2 rounded-full text-white bg-red-500 hover:bg-red-600"
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
