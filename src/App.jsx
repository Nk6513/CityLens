//================================================================
// | -------- Weather App -------- |
//================================================================

import React, { useEffect, useState } from "react";
import "./index.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { LocationProvider, useLocation } from "./LocationContext";

// ---------------------------------------------------------------
// Import Components
// ---------------------------------------------------------------
import WeatherCard from "./components/WeatherCard";
import Map from "./components/Map";
import About from "./components/About";
import MainLayout from "./components/MainLayout";
import Homepage from "./components/Homepage";

// ---------------------------------------------------------------
// App Component
// ---------------------------------------------------------------
export default function App() {
  return (
    <LocationProvider>
      <AppContent />
    </LocationProvider>
  );
}

// ---------------------------------------------------------------
// AppContent (logic moved inside provider)
// ---------------------------------------------------------------
function AppContent() {
  const { setCoordinates, setCityInfo, setWeatherData} = useLocation(); 
  const [inputSearch, setInputSearch] = useState("");
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();

  // ---------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------
  const handleChange = (e) => setInputSearch(e.target.value);
  const handleClear = () => setInputSearch("");

  const handleSearch = async () => {
    if (!inputSearch) return;
    setShowAlert(true);

    try {
      const [data, wikiResult] = await Promise.all([
        fetchWeather(inputSearch),
        fetchCityInfo(inputSearch),
      ]);

      if (data) {
        setWeatherData(data);
        setCoordinates({ lat: data.coord?.lat, lon: data.coord?.lon });
        setError("");
        navigate("/weather");
      } else {
        setWeatherData(null);
        setError("City not found");
      }

      if (wikiResult) setCityInfo(wikiResult);
    } catch (error) {
      setWeatherData(null);
      setCityInfo(null);
      setError(error.message || "Something went wrong.");
      console.error("Error in handleSearch:", error);
    }
  };

  // ---------------------------------------------------------------
  // API Calls
  // ---------------------------------------------------------------
  const fetchWeather = async (city) => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("City not found");
      return await response.json();
      
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const fetchCityInfo = async (cityName) => {
    try {
      const wikiRes = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts|pageprops&exintro&titles=${encodeURIComponent(
          cityName
        )}`
      );
      const wikiData = await wikiRes.json();
      const pages = wikiData?.query?.pages;
      if (!pages) return null;

      const pageId = Object.keys(pages)[0];
      if (pageId && pages[pageId]) {
        return {
          title: pages[pageId].title,
          extract: pages[pageId].extract,
        };
      }
      return null;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  // ---------------------------------------------------------------
  // Remove focus when app loads
  // ---------------------------------------------------------------
  useEffect(() => {
    document.activeElement.blur();
  }, []);

  // ---------------------------------------------------------------
  // Render Routes
  // ---------------------------------------------------------------
  return (
    <Routes>
      {/* ---------------- Home Page ---------------- */}
      <Route
        path="/"
        element={
          <MainLayout>
            <Homepage
              onChange={handleChange}
              value={inputSearch}
              onSearch={handleSearch}
              error={error}
              clearInput={handleClear}
            />
          </MainLayout>
        }
      />

      {/* ---------------- Weather Page ---------------- */}
      <Route
        path="/weather"
        element={
          <MainLayout>
            <div className="flex justify-center">
              <WeatherCard
                showAlert={showAlert}
                error={error}
              />
            </div>
          </MainLayout>
        }
      />

      {/* ---------------- Map Page ---------------- */}
      <Route
        path="/map/:lat?/:lon?"
        element={
          <MainLayout>
            <Map />
          </MainLayout>
        }
      />

      {/* ---------------- About Page ---------------- */}
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
}
