//================================================================
// | -------- Weather App -------- |
//================================================================

import React, { useState } from "react";
import "./index.css";

// ---------------------------------------------------------------
// Import Components
// ---------------------------------------------------------------
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import AlertsPanel from "./components/AlertsPanel";
import Footer from "./components/Footer";

// ---------------------------------------------------------------
// App Component
// ---------------------------------------------------------------
export default function App() {

  // ----------------------------------------------------------------
  // State Management
  // ----------------------------------------------------------------
  const [inputSearch, setInputSearch] = useState(""); // User input
  const [weatherData, setWeatherData] = useState(null); // Fetched weather data
  const [error, setError] = useState("");

  // ----------------------------------------------------------------
  // Event Handlers
  // ----------------------------------------------------------------

  // Handles changes in the search input field
  const handleChange = (e) => {
    setInputSearch(e.target.value);
  };

  // Handles the search action
  const handleSearch = async () => {
    if (!inputSearch) return;
try {
    const data = await fetchWeather(inputSearch);
    if (data) {
      setWeatherData(data);
      setError(""); // clear any previous error
    } else {
      setWeatherData([]);
      setError("City not found");
    }
  } catch (error) {
    setWeatherData(null);
    // capture the original error message
    setError(error.message || "Something went wrong.");
    console.error("Weather API error:", error);
  }
    
  };

  // ----------------------------------------------------------------
  // API Call Function
  // ----------------------------------------------------------------
  const fetchWeather = async (city) => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("City not found");
      const data = await response.json();
      console.log(data);  
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  // ----------------------------------------------------------------
  // Render App
  // ----------------------------------------------------------------
return (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <div className="flex-1 bg-gradient-to-br from-blue-400 via-blue-300 to-blue-100">
      <main className="container mx-auto px-4 py-6 space-y-6">
        <SearchBar
          onChange={handleChange}
          value={inputSearch}
          onSearch={handleSearch}
        />
        {weatherData && !error && <AlertsPanel weatherData={weatherData} />}

        <div className="flex justify-center">
          <WeatherCard weatherData={weatherData} error={error} />
        </div>
      </main>
    </div>
    <Footer />
  </div>
);

};
