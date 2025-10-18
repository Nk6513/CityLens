import { createContext, useContext, useState } from "react";

// ---------------------------------------------------------------
// Location Context
// ---------------------------------------------------------------
const LocationContext = createContext();

// ---------------------------------------------------------------
// Location Provider Component
// ---------------------------------------------------------------
export const LocationProvider = ({ children }) => {
  // ---------------- State Management ----------------
  const [coordinates, setCoordinates] = useState(null);
  const [cityInfo, setCityInfo] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  // ---------------- Context Provider ----------------
  return (
    <LocationContext.Provider
      value={{
        coordinates,
        setCoordinates,
        cityInfo,
        setCityInfo,
        weatherData,
        setWeatherData,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

// ---------------------------------------------------------------
// Custom Hook for Accessing Context
// ---------------------------------------------------------------
export const useLocation = () => useContext(LocationContext);
