import React from 'react';

const ForecastChart = () => {
  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6 m-4">
      <h2 className="text-xl font-bold mb-4 text-center">7-Day Forecast</h2>
      
      {/* Placeholder chart */}
      <div className="w-full h-48 bg-blue-100 rounded-lg flex items-center justify-center">
        <p className="text-blue-500 font-semibold">Chart will appear here</p>
      </div>

      {/* Sample forecast labels */}
      <div className="flex justify-between mt-4 text-gray-700">
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
        <span>Sun</span>
      </div>
    </div>
  );
};

export default ForecastChart;
