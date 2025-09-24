//================================================================
// |---------- Weather App -------- |
//================================================================

import React, { useState } from "react";
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

export default function App() {
  // Capture user text from search bar
  const [inputSearch, setInputSearch] = useState("");
  const [weatherData, setWeatherData]= useState(null);

  const handleChange = (e) => {
    setInputSearch(e.target.value);
    // console.log(inputSearch);
  };

  const handleSearch = async () => {
    if(!inputSearch) return;
    const data = await fetchWeather(inputSearch);
    setWeatherData(data);
  };

  // API that will pick the weather

  const fetchWeather = async (city) => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try{
      const response= await fetch(url);
      if(!response.ok) throw new Error('city not found');
      const data= await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return null;

    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6 space-y-6">
        <SearchBar onChange={handleChange} value={inputSearch} onSearch={handleSearch} />
        <div className="flex justify-center mt-6">
          <WeatherCard weatherData = {weatherData} />
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
