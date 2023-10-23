import React, { useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button onClick={toggleDropdown}>
        <AiOutlineUser />
      </button>
      {isOpen && (
        <button onClick={toggleDropdown} className="fixed top-0 right-0 bottom-0 left-0 w-full h-full bg-black opacity-50 cursor-default"></button>
      )}
      {isOpen && (
        <div className="absolute right-0 mt-2 py-2 w-48 bg-gray-100 rounded-lg shadow-xl">
          <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">
            Account Settings
          </a>
          <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">
            Sign Out
          </a>
        </div>
      )}
    </div>
  );
}
