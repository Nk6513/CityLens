import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

// ---------------------------------------------------------------
// Navbar Component
// ---------------------------------------------------------------
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md sticky fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-4">
        <div className="flex justify-between h-16 items-center">
          {/*---------- logo ----------*/}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <img
              onClick={() => (window.location.href = "/")}
              src="/cityLens.svg"
              alt="Logo"
              width={100}
              height={100}
              className="h-20 w-32 object-contain cursor-pointer"
            />
          </Link>

          {/*---------- Desktop Links ----------*/}
          <div className="hidden md:flex space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-300 font-semibold"
                  : "text-white hover:text-yellow-200 transition-colors"
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/weather"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-300 font-semibold"
                  : "text-white hover:text-yellow-200 transition-colors"
              }
            >
              Weather
            </NavLink>

            <NavLink
              to="/map"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-300 font-semibold"
                  : "text-white hover:text-yellow-200 transition-colors"
              }
            >
              Maps
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-300 font-semibold"
                  : "text-white hover:text-yellow-200 transition-colors"
              }
            >
              About
            </NavLink>
          </div>

          {/*---------- Mobile Menu Button ----------*/}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-500 focus:ring-white"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isOpen
                      ? "M6 18L18 6M6 6l12 12" // X icon
                      : "M4 6h16M4 12h16M4 18h16" // Hamburger
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/*---------- Mobile links ----------*/}
      {isOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 bg-indigo-700">
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-500"
          >
            Home
          </NavLink>

           <NavLink
            to="/weather"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-500"
          >
            Weather
          </NavLink>

          <NavLink
            to="/map"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-500"
          >
            Map
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-500"
          >
            About
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
