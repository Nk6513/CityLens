import { Link } from "react-router-dom";


const Navbar = () => {
  
  return (
    <nav className="bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md">
      {/* Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo / App Name */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              onClick={() => (window.location.href = "/")}
              src="/cityLens.svg"
              alt="Logo"
              width={100}
              height={100}
              className="cursor-pointer"
            />

            {/* <span  className="text-xl font-bold text-white">CityLens</span> */}
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6">
            <Link
              to="/"
              className="text-white hover:text-yellow-300 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/weather"
              className="text-white hover:text-yellow-300 transition-colors"
            >
              Weather
            </Link>
            <Link
              to={"/map"}
              className="text-white hover:text-yellow-300 transition-colors"
            >
              Maps
            </Link>
            <Link
              to="/about"
              className="text-white hover:text-yellow-300 transition-colors"
            >
              About
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
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
                  className="inline-flex"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Links (hidden by default) */}
      <div className="md:hidden hidden px-2 pt-2 pb-3 space-y-1">
        <Link
          to="/"
          className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-500"
        >
          Home
        </Link>
        <Link
          to="/map"
          className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-500"
        >
          Map
        </Link>
        <Link
          to="/about"
          className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-500"
        >
          About
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
