import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md">
      {/* Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo / App Name */}
          <Link to="/" className="flex items-center space-x-2">
            <svg
              className="w-8 h-8 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M6.995 12c.445-3.725 3.64-6.646 7.505-6.646 2.854 0 5.314 1.645 6.449 4.002C22.398 9.79 24 11.613 24 13.867c0 2.71-2.186 4.905-4.884 4.905H7.125C3.19 18.772 0 15.563 0 11.637c0-3.607 2.785-6.56 6.361-6.908a7.486 7.486 0 0 1 .634 7.271z" />
            </svg>
            <span onClick={()=> navigate('/')} className="text-xl font-bold text-white">CityWeather</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-white hover:text-yellow-300 transition-colors">Weather</Link>
            <Link to={`/map`} className="text-white hover:text-yellow-300 transition-colors">Maps</Link>
            {/* <Link to="/about" className="text-white hover:text-yellow-300 transition-colors">About</Link> */}
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
        <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-500">Home</Link>
        <Link to="/map" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-500">Map</Link>
        <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-500">About</Link>
      </div>
    </nav>
  );
};

export default Navbar;
