import React from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastChart from "./components/ForecastChart";
import AlertsPanel from "./components/AlertsPanel";
import Footer from "./components/Footer";

import "./index.css";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6 space-y-6">
        {/* Search Bar */}
        <SearchBar />

        {/* Weather Overview */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <WeatherCard />
          <WeatherCard />
          <WeatherCard />
        </div>

        {/* Forecast Chart */}
        <ForecastChart />

        {/* Alerts Panel */}
        <AlertsPanel />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
