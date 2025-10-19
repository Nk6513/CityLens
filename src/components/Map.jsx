import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLocation } from "../LocationContext";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

// ---------------------------------------------------------------
// MapUpdater: Recenter map when position changes
// ---------------------------------------------------------------
const MapUpdater = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(position, map.getZoom(), { animate: true });
  }, [position, map]);

  return null;
};

// ---------------------------------------------------------------
// Map Component
// ---------------------------------------------------------------
const Map = () => {
  // ---------------------------------------------------------------
  // Context & Navigation
  // ---------------------------------------------------------------
  const { coordinates, cityInfo } = useLocation();
  console.log(cityInfo);
  const navigate = useNavigate();

  // ---------------------------------------------------------------
  // Default and current map position
  // ---------------------------------------------------------------
  const defaultPosition = [40.7128, -74.006];
  const position = coordinates
    ? [coordinates.lat, coordinates.lon]
    : defaultPosition;

  // ---------------------------------------------------------------
  // Local States
  // ---------------------------------------------------------------
  const [mapPosition, setMapPosition] = useState(position);
  const [searchValue, setSearchValue] = useState("");
  const [route, setRoute] = useState(null);
  const [routeInfo, setRouteInfo] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [isRouteLoading, setIsRouteLoading] = useState(false);

  // ---------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------
  const handleNavigate = () => {
    navigate("/about");
  };

  // ---------------------------------------------------------------
  // Get user location
  // ---------------------------------------------------------------
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => setUserLocation([coords.latitude, coords.longitude]),
      (err) => console.warn("Geolocation not available", err)
    );
  }, []);

  // ---------------------------------------------------------------
  // Update map when coordinates or cityInfo changes
  // ---------------------------------------------------------------

  // Ref to track if the fetch has already been done
  const fetchRef = useRef(false);
  useEffect(() => {
    if(!coordinates || !fetchRef.current) return;
    if (coordinates) {
      setMapPosition([coordinates.lat, coordinates.lon]);
      fetchCityByCoords(cityInfo);

      if (userLocation) {
        fetchRoute(userLocation, [coordinates.lat, coordinates.lon]);
      }
    }
    fetchRef.current = true; // Mark fetch as done to prevent duplicate calls (e.g., React Strict Mode)
  }, [cityInfo, userLocation, coordinates]);

  // ---------------------------------------------------------------
  // Set city name from Wikipedia data
  // ---------------------------------------------------------------
  const fetchCityByCoords = (cityInfo) => {
    if (!cityInfo?.title) return;
    setSearchValue(cityInfo.title);
  };

  // ---------------------------------------------------------------
  // Fetch route info between two points
  // ---------------------------------------------------------------
  const fetchRoute = async (start, end) => {
    try {
      setIsRouteLoading(true); // show loading state
      const [startLat, startLon] = start;
      const [endLat, endLon] = end;

      const res = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${startLon},${startLat};${endLon},${endLat}?overview=full&geometries=geojson`
      );

      const data = await res.json();

      if (data.routes?.length) {
        const routeCoords = data.routes[0].geometry.coordinates.map(
          ([lon, lat]) => [lat, lon]
        );

        setRoute(routeCoords);
        setRouteInfo({
          distance: (data.routes[0].distance / 1000).toFixed(2),
          duration: (data.routes[0].duration / 60).toFixed(0),
        });
        setIsRouteLoading(false);
      } else {
        setRoute(null);
        setRouteInfo(null);
      }
    } catch (err) {
      console.error("Error fetching route", err);
      setRoute(null);
      setRouteInfo(null);
    }
  };

  // ---------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------
  return (
    <div className="w-full max-w-full h-auto md:h-[500px] rounded-2xl shadow-lg flex flex-col md:flex-row">
      {/* ---------------- Side Bar on Map ---------------- */}
      <div className="w-full md:w-1/3 p-4 flex flex-col bg-gradient-to-b from-blue-300 to-blue-500 text-white shadow-lg overflow-auto">
        <h2 className="text-lg font-bold text-blue-800 mb-4">Location</h2>

        {searchValue ? (
          <h4 className="inline-block text-2xl font-bold text-left text-gray-900">
            {searchValue}
          </h4>
        ) : (
          <div className="flex items-center border-l-4 border-blue-700 bg-blue-400 px-6 py-4 rounded-r-lg shadow-md max-w-xl">
            <span className="text-md font-semibold leading-relaxed font-sans text-gray-900">
              No city searched yet
            </span>
          </div>
        )}

        {/* ---------------- Route Info ---------------- */}
        {isRouteLoading ? (
          <div className="mt-4 flex items-center justify-center space-x-1 w-full">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-2 h-2 bg-blue-300 rounded-full animate-bounce"></span>
          </div>
        ) : routeInfo ? (
          <div className="mt-4 p-2 sm:p-4 bg-blue-700 rounded shadow-md w-full">
            <h3 className="font-semibold text-white mb-1">Route Info</h3>
            <p className="text-blue-100">Distance: {routeInfo.distance} km</p>
            <p className="text-blue-100">Duration: {routeInfo.duration} min</p>
          </div>
        ) : null}

        {/* ---------------- Side Bar button navigaton to About page ---------------- */}
        {cityInfo && (
          <div
            onClick={handleNavigate}
            className="mt-4 p-2 bg-blue-700 rounded hover:bg-blue-600 transition-colors text-center cursor-pointer"
          >
            <span className="text-white font-semibold">
              More About {cityInfo?.title}
            </span>
          </div>
        )}
      </div>

      {/* ---------------- Map section ---------------- */}
      <div className="w-full md:w-2/3 h-[400px] md:h-full overflow-hidden rounded-b-2xl md:rounded-r-2xl">
        <MapContainer
          center={mapPosition}
          zoom={13}
          scrollWheelZoom={true}
          className="w-full h-full"
        >
          <MapUpdater position={mapPosition} />

          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={mapPosition}>
            <Popup>
              {mapPosition[0].toFixed(4)}, {mapPosition[1].toFixed(4)}
            </Popup>
          </Marker>

          {route && <Polyline positions={route} color="red" weight={4} />}
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
