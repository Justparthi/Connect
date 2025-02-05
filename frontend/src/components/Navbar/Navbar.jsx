import React, { useState } from 'react';
import { Menu, X, LogIn } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <a href="/" className="text-2xl font-bold text-blue-600">
                Logo
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <a href="/" className="text-gray-900 hover:bg-gray-200 px-3 py-2 rounded-md">Home</a>
              <a href="/about" className="text-gray-900 hover:bg-gray-200 px-3 py-2 rounded-md">About</a>
              <a href="/services" className="text-gray-900 hover:bg-gray-200 px-3 py-2 rounded-md">Services</a>
              <a href="/contact" className="text-gray-900 hover:bg-gray-200 px-3 py-2 rounded-md">Contact</a>
            </div>
          </div>

          {/* Login Button & Mobile Menu Toggle */}
          <div className="flex items-center">
            <div className="hidden sm:flex sm:items-center">
              <button 
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
              >
                <LogIn className="mr-2 h-5 w-5" />
                Login
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="-mr-2 flex sm:hidden">
              <button 
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                {isOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <a href="/" className="text-gray-900 hover:bg-gray-200 block px-3 py-2 rounded-md">Home</a>
              <a href="/about" className="text-gray-900 hover:bg-gray-200 block px-3 py-2 rounded-md">About</a>
              <a href="/services" className="text-gray-900 hover:bg-gray-200 block px-3 py-2 rounded-md">Services</a>
              <a href="/contact" className="text-gray-900 hover:bg-gray-200 block px-3 py-2 rounded-md">Contact</a>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <button 
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center justify-center"
              >
                <LogIn className="mr-2 h-5 w-5" />
                Login
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;