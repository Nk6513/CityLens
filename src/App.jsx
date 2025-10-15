//================================================================
// | -------- Weather App -------- |
//================================================================

import React, { useEffect,useState } from "react";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import { CoordinatesProvider } from "./coordContext";
import { useNavigate } from "react-router-dom";


// ---------------------------------------------------------------
// Import Components
// ---------------------------------------------------------------
import WeatherCard from "./components/WeatherCard";
import AlertsPanel from "./components/AlertsPanel";
import Map from "./components/Map";
import About from "./components/About";
import MainLayout from "./components/MainLayout";
import Homepage from "./components/Homepage";

// ---------------------------------------------------------------
// App Component
// ---------------------------------------------------------------
export default function App() {
  // ----------------------------------------------------------------
  // State Management
  // ----------------------------------------------------------------
  const [inputSearch, setInputSearch] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(true);
  const [cityInfo, setCityInfo] = useState(null);

  const navigate = useNavigate();

  // ----------------------------------------------------------------
  // Event Handlers
  // ----------------------------------------------------------------
  const handleChange = (e) => {
    setInputSearch(e.target.value);
  };

  const handleSearch = async () => {
    if (!inputSearch) return;
    setShowAlert(true);

    try {
      const [data, wikiResult] = await Promise.all([
        fetchWeather(inputSearch),
        fetchCityInfo(inputSearch),
      ]);

      // Weather API
      if (data) {
        setWeatherData(data);
        setCoordinates({ lat: data.coord?.lat, lon: data.coord?.lon });
        setError("");
      // Navigate to Weather page
        navigate("/weather");
      } else {
        setWeatherData(null);
        setError("City not found");
      }

      // Wikipedia API
      if (wikiResult) setCityInfo(wikiResult);
    } catch (error) {
      setWeatherData(null);
      setCityInfo(null);
      setError(error.message || "Something went wrong.");
      console.error("Error in handleSearch:", error);
    }
  };

  // ----------------------------------------------------------------
  // Weather API Call
  // ----------------------------------------------------------------
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

  // ----------------------------------------------------------------
  // Wikipedia API Call
  // ----------------------------------------------------------------
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

  // ----------------------------------------------------------------
  // Timeout set for AlertsPanel
  // ----------------------------------------------------------------
   useEffect(() => {
      const setAlert = setTimeout(() => {
      if (!showAlert) return;
        setShowAlert(false);
      }, 3000);

      return () => clearTimeout(setAlert);
      }, [showAlert]);


  // ----------------------------------------------------------------
  // Render App
  // ----------------------------------------------------------------
  return (
    <CoordinatesProvider coordinates={coordinates} setCoordinates={setCoordinates}>
      <Routes>
        {/* ---------------- Home Page ---------------- */}
        <Route
          path="/"
          element={
            <MainLayout coordinates={coordinates}>
              <Homepage
                onChange={handleChange}
                value={inputSearch}
                onSearch={handleSearch}
              />
            </MainLayout>
          }
        />

        {/* ---------------- Weather Page ---------------- */}
        <Route
          path="/weather"
          element={
            <MainLayout coordinates={coordinates}>
              

                {/* Alerts */}
                {weatherData && !error && (
                  <AlertsPanel weatherData={weatherData} showAlert={showAlert} />
                )}

                {/* Weather Card */}
                <div className="flex justify-center">
                  <WeatherCard weatherData={weatherData} error={error} />
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
              <About cityInfo={cityInfo} />
            </MainLayout>
          }
        />
      </Routes>
    </CoordinatesProvider>
  );
}
