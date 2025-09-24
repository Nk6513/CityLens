//================================================================
// |---------- Weather App -------- |
//================================================================

import React from "react";
<<<<<<< HEAD
import { useState } from "react";
=======
import { useState, useEffect } from "react";
>>>>>>> b6d87bea5280460cf4fd4623d09ab0514cc074a5
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
//  App ----------------
//----------------------------------------------------------------
<<<<<<< HEAD
export default function App() { 
  // Capture usertext from search bar 
  const [inputSearch, setInputSearch] = useState("");
  const handleChange = (e) => {
    setInputSearch(e.target.value);
    //console.log(inputSearch);
=======
export default function App() {
  // Using useState to capture input from search box
  const [inputSearch, setInputSearch] = useState("");

  const handleChange = (e) => {
    setInputSearch(e.target.value);
>>>>>>> b6d87bea5280460cf4fd4623d09ab0514cc074a5
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