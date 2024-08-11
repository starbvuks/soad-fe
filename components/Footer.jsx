import Link from "next/link";
import { useState } from "react";

export default function NavBar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
    console.log("Dropdown state:", isDropdownOpen);
  };

  return (
    <header className="fixed text-xs lg:text-sm -bottom-1 px-8 pb-4 pt-2 lg:py-6 font-Monstserrat font-normal bg-[#f6f6f6] left-0 w-screen lg:h-6 text-gray-400 border-t-2 border-gray-200 z-50 flex justify-between items-center">
      <span>@Copyright, Woxsen University, Hyderabad</span>
      {/* <span>Contact</span> */}
    </header>
  );
}
