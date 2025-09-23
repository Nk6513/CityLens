import React from 'react';

const SearchBar = () => {
  return (
    <div className="flex justify-center mt-6">
      <input
        type="text"
        placeholder="Enter city..."
        className="px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
