//================================================================
// | -------- Weather App -------- |
//================================================================

import React, {  useEffect, useState } from "react";
import "./index.css";
import { Route, Routes } from "react-router-dom";

// ---------------------------------------------------------------
// Import Components
// ---------------------------------------------------------------
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import AlertsPanel from "./components/AlertsPanel";
import Footer from "./components/Footer";
import Map from "./components/map";
import About from "./components/About";
import MainLayout from "./components/MainLayout";

// ---------------------------------------------------------------
// App Component
// ---------------------------------------------------------------
export default function App() {

  // ----------------------------------------------------------------
  // State Management
  // ----------------------------------------------------------------
  const [inputSearch, setInputSearch] = useState(""); 
  const [weatherData, setWeatherData] = useState(null); 
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(true);

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
    setShowAlert(true); // whenever user changes the city show the alert again!
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
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  // ----------------------------------------------------------------
  // Timeout set for AlertsPanel
  // ----------------------------------------------------------------
  useEffect(() => {
    const setAlert = setTimeout(() => {
      if(!showAlert) return;
      setShowAlert(false);
    }, 3000); 
    return () => clearTimeout(setAlert);
  }, [showAlert])

  // ----------------------------------------------------------------
  // Render App
  // ----------------------------------------------------------------
return (
  <Routes>
  {/* Home Page */}
  <Route
    path="/"
    element={
      <MainLayout>
        <SearchBar
          onChange={handleChange}
          value={inputSearch}
          onSearch={handleSearch}
        />
        {weatherData && !error && (
          <AlertsPanel weatherData={weatherData} showAlert={showAlert} />
        )}
        <div className="flex justify-center">
          <WeatherCard weatherData={weatherData} error={error} />
        </div>
      </MainLayout>
    }
  />

  {/* Map Page */}
  <Route
    path="/map"
    element={
      <MainLayout>
        <Map />
      </MainLayout>
    }
  />

  {/* About Page */}
  <Route
    path="/about"
    element={
      <MainLayout>
        <About />
      </MainLayout>
    }
  />
</Routes>
);

};
