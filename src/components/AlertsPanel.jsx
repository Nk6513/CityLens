import React from 'react';

const AlertsPanel = () => {
  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6 m-4">
      <h2 className="text-xl font-bold mb-4 text-center text-red-600">Weather Alerts</h2>

      {/* Placeholder alerts */}
      <ul className="space-y-3">
        <li className="bg-red-100 text-red-800 p-3 rounded-md">
          ⚠️ Heatwave warning in your area
        </li>
        <li className="bg-yellow-100 text-yellow-800 p-3 rounded-md">
          ⚠️ High UV index today
        </li>
        <li className="bg-blue-100 text-blue-800 p-3 rounded-md">
          ⚠️ Chance of thunderstorms tomorrow
        </li>
      </ul>
    </div>
  );
};

export default AlertsPanel;
