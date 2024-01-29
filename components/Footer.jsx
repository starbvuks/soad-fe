import Link from "next/link";
import { useState } from "react";

export default function NavBar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
    console.log("Dropdown state:", isDropdownOpen);
  };

  return (
    <header className="fixed text-sm -bottom-1 px-8 py-5 font-Monstserrat font-normal bg-[#f6f6f6] left-0 w-screen h-6 text-gray-400 border-t-2 border-gray-200 z-50 flex justify-between items-center">
      <span>WoU SoAD Branch, 2024</span>
      <span>Contact</span>
    </header>
  );
}
