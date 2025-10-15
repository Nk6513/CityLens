import React from "react";

const Homepage = ({ value, onChange, onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center from-blue-100">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-4">
          Welcome to CityLens
        </h1>
        <p className="text-lg md:text-xl text-gray-700">
          Enter a city below to get current weather, map, and city info.
        </p>
      </div>

      {/* Search Bar */}
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-md shadow-lg rounded-full overflow-hidden border border-gray-300"
      >
        {/* Search Icon (inline SVG) */}
        <div className="flex items-center pl-4 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-10"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.386-1.414 1.415-4.387-4.387zM14 8a6 6 0 11-12 0 6 6 0 0112 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Enter city..."
          className="flex-grow px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 hover:bg-blue-700 transition-colors font-semibold"
        >
          Search
        </button>
      </form>

      {/* Hero Image */}
      <div className="mt-12 w-full max-w-lg">
        <img
          src="/city-illustration.svg"
          alt="City illustration"
          className="w-full rounded-xl shadow-lg"
        />
      </div>
    </div>
  );
};

export default Homepage;
