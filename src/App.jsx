//================================================================
// |---------- Weather App -------- |
//================================================================

import React from "react";
import { useState, useEffect } from "react";
import "./index.css";

//----------------------------------------------------------------
// Components ----------
//----------------------------------------------------------------
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastChart from "./components/ForecastChart";
import AlertsPanel from "./components/AlertsPanel";
import Footer from "./components/Footer";

//----------------------------------------------------------------

//----------------------------------------------------------------

//----------------------------------------------------------------
//  App ----------------
//----------------------------------------------------------------
export default function App() {
  // Using useState to capture input from search box
  const [inputSearch, setInputSearch] = useState("");

  const handleChange = (e) => {
    setInputSearch(e.target.value);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6 space-y-6">
        <SearchBar onChange={handleChange} value={inputSearch} />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <WeatherCard />
          <WeatherCard />
          <WeatherCard />
        </div>
        <ForecastChart />
        <AlertsPanel />
      </main>
      <Footer />
    </div>
  );
}
