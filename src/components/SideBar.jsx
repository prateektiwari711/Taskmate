import React, { useState } from "react";
import { FaTachometerAlt, FaBars } from "react-icons/fa";

function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="fixed top-4 left-4 bg-gray-700 text-white p-2 rounded-md z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaBars size={24} />
      </button>

      <div
        className={`fixed top-0 left-0 h-screen bg-[#202848] text-white p-4 transition-all duration-300 z-40
          ${
            isOpen ? "w-[60vw] px-4" : "w-0 px-0"
          } md:w-[20vw] md:px-4 overflow-hidden`}
      >
        <h1
          className={`text-2xl font-bold ${
            isOpen ? "block" : "hidden"
          } md:block`}
        >
          TaskMate
        </h1>

        <ul className="list-none p-4 text-xl">
          <li
            className="bg-[#334977] rounded p-2 cursor-pointer flex items-center gap-2"
            onClick={() => setIsOpen(false)}
          >
            <FaTachometerAlt className="w-6 h-6 text-white lg:text-xl" />
            <span className={`${isOpen ? "block" : "hidden"} md:block`}>
              Dashboard
            </span>
          </li>
        </ul>
      </div>
    </>
  );
}

export default SideBar;
