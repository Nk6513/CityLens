
import { createContext, useContext } from "react";

// Create context
const CoordinatesContext = createContext();

// Provider component
export const CoordinatesProvider = ({ coordinates, setCoordinates, children }) => {
  return (
    <CoordinatesContext.Provider value={{ coordinates, setCoordinates }}>
      {children}
    </CoordinatesContext.Provider>
  );
};

// Custom hook for easy access
export const useCoordinates = () => useContext(CoordinatesContext);