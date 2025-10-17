import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useCoordinates } from "../coordContext"; // import global context

// Helper to re-center map when coordinates change
const MapUpdater = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(position, map.getZoom(), { animate: true });
  }, [position, map]);
  return null;
};

const Map = () => {
  const { coordinates, setCoordinates } = useCoordinates(); // get global lat/lon
  const defaultPosition = [40.7128, -74.006]; // NYC fallback
  const position = coordinates
    ? [coordinates.lat, coordinates.lon]
    : defaultPosition;

  const [mapPosition, setMapPosition] = useState(position);
  const [searchValue, setSearchValue] = useState("");

  // If global coordinates change, recenter map
  useEffect(() => {
    if (coordinates) {
      setMapPosition([coordinates.lat, coordinates.lon]);
      fetchCityByCoords(coordinates.lat, coordinates.lon);
    }
  }, [coordinates]);

  // Reverse geocode lat/lon → city name
  const fetchCityByCoords = async (lat, lon) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      const data = await res.json();
      if (data.address) {
        const cityName =
          data.address.city ||
          data.address.town ||
          data.address.village ||
          data.address.county ||
          data.address.state;
        if (cityName) {
          setSearchValue(cityName);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Search by city name
  const handleSearch = async () => {
    if (!searchValue) return;
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchValue
        )}`
      );
      const data = await response.json();
      if (!data.length) return alert("Location not found");

      const lat = parseFloat(data[0].lat);
      const lon = parseFloat(data[0].lon);
      setMapPosition([lat, lon]);
      setCoordinates({ lat, lon }); // update global context too
    } catch (err) {
      console.error(err);
      alert("Error searching location");
    }
  };

  return (
    <div className="w-full max-w-full h-auto md:h-[500px] rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden">
      {/* Sidebar */}
      <div className="w-full md:w-1/3 p-4 flex flex-col bg-gradient-to-b from-blue-300 to-blue-500 text-white shadow-lg overflow-auto">
        <h2 className="text-lg font-bold text-blue-800 mb-4">Search Location</h2>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Enter a city or place..."
          className="w-full p-2 rounded mb-2 text-black"
        />
        <button
          onClick={handleSearch}
          className="w-full p-2 bg-blue-200 text-blue-900 font-semibold rounded hover:bg-blue-600 hover:text-white transition-colors"
        >
          Search
        </button>
      </div>

      {/* Map */}
      <div className="w-full md:w-2/3 h-[400px] md:h-full rounded-2xl overflow-hidden">
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
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
