
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-2xl font-bold text-primary-600 flex items-center space-x-2"
            >
              <span>SnapText</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              to="/editor"
              className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Editor
            </Link>
            <Link
              to="/blog"
              className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Blog
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/editor"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600"
              onClick={toggleMenu}
            >
              Editor
            </Link>
            <Link
              to="/blog"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600"
              onClick={toggleMenu}
            >
              Blog
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600"
              onClick={toggleMenu}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600"
              onClick={toggleMenu}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
