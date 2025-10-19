import React, { useState } from "react";

//--------------------------------------------------
// Homepage Component
// --------------------------------------------------
const Homepage = ({ value, onChange, onSearch, error, clearInput }) => {
  // --------------------------------------------------
  // Local State - tracking focus for input box
  // --------------------------------------------------
  const [isFocused, setIsFocused] = useState(false);

  // --------------------------------------------------
  // Handler
  // --------------------------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center from-blue-100">
      {/* ---------------- Hero Section ---------------- */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-4">
          Welcome to CityLens
        </h1>
        <p className="text-lg md:text-xl text-gray-700">
          Enter a city below to get current weather, map, and city info.
        </p>
      </div>

      {/* ---------------- Search Bar ---------------- */}
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-md shadow-lg rounded-full overflow-hidden border border-gray-300"
      >
        {/* ---------------- Search Icon ---------------- */}
        <div className="flex items-center pl-4 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-10 md:visible" 
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
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Enter city..."
          className="flex-grow px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 min-w-0"
        />
        {/* ---------------- Render input box based on focus and value ---------------- */}
        {isFocused && value && (
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()} // prevent input blur
            onClick={clearInput}
            className="px-3 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 md:px-6 py-3 hover:bg-blue-700 transition-colors font-semibold flex-shrink-0 flex items-center justify-center min-w-[90px] md:min-w-[110px]"
        >
          {/*---------- Text visible on medium+ screens ----------*/}
          <span className="md:visible text-center">
            Search
          </span>

          {/*---------- Icon visible on small screens ----------*/}
          {/* <svg
            className="w-5 h-5 md:invisible visible  absolute"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
            />
          </svg> */}
        </button>
      </form>

      {error && value && (
        <p className="mt-2 text-sm sm:text-base font-medium text-red-700 bg-red-100 border border-red-300 rounded-md px-3 py-2 flex items-center gap-2">
          <span className="text-lg">⚠️</span> {error}
        </p>
      )}

      {/* ---------------- Hero Image ---------------- */}
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
