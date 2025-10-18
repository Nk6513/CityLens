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
  const navigate = useNavigate();
  console.log(cityInfo);

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
  useEffect(() => {
    if (coordinates) {
      setMapPosition([coordinates.lat, coordinates.lon]);
      fetchCityByCoords(cityInfo);

      if (userLocation) {
        fetchRoute(userLocation, [coordinates.lat, coordinates.lon]);
      }
    }
  }, [coordinates, userLocation]);

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
    <div className="w-full max-w-full h-auto md:h-[500px] rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden">
      {/* ---------------- Side Bar on Map ---------------- */}
      <div className="w-full md:w-1/3 p-4 flex flex-col bg-gradient-to-b from-blue-300 to-blue-500 text-white shadow-lg overflow-auto">
        <h2 className="text-lg font-bold text-blue-800 mb-4">Location</h2>

        {searchValue ? (
          <h4 className="inline-block text-2xl font-bold text-left text-gray-900">
            {searchValue}
          </h4>
        ) : (
          <div className="flex items-center justify-center w-full p-3 bg-gradient-to-r from-blue-500 via-blue-500 to-blue-500 rounded-xl shadow-inner animate-pulse">
            <span className="text-gray-900 text-base font-medium">
              No city searched yet
            </span>
          </div>
        )}

        {/* ---------------- Route Info ---------------- */}
        {isRouteLoading ? (
          <div className="mt-4 flex items-center justify-center space-x-1">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-2 h-2 bg-blue-300 rounded-full animate-bounce"></span>
          </div>
        ) : routeInfo ? (
          <div className="mt-4 p-2 bg-blue-700 rounded shadow-md">
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
