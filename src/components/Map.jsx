import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Helper to re-center map
const MapUpdater = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(position, map.getZoom(), { animate: true });
  }, [position, map]);
  return null;
};

const Map = () => {
  const { lat, lon } = useParams();

  const defaultPosition = [40.7128, -74.006]; // NYC default
  const latitude = lat ? parseFloat(lat) : null;
  const longitude = lon ? parseFloat(lon) : null;
  const hasValidCoords =
    typeof latitude === "number" &&
    typeof longitude === "number" &&
    !isNaN(latitude) &&
    !isNaN(longitude) &&
    Math.abs(latitude) <= 90 &&
    Math.abs(longitude) <= 180;

  const initialPosition = hasValidCoords ? [latitude, longitude] : defaultPosition;

  const [position, setPosition] = useState(initialPosition);
  const [searchValue, setSearchValue] = useState("");
  const [cityInfo, setCityInfo] = useState(null);

  // Fetch city info by name (Wikipedia)
  const fetchCityInfo = async (cityName) => {
    try {
      const wikiRes = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts|pageprops&exintro&titles=${encodeURIComponent(
          cityName
        )}`
      );
      const wikiData = await wikiRes.json();
      const pages = wikiData.query.pages;
      const pageId = Object.keys(pages)[0];
      if (pageId && pages[pageId]) {
        setCityInfo({
          title: pages[pageId].title,
          extract: pages[pageId].extract,
        });
      } else {
        setCityInfo(null);
      }
    } catch (err) {
      console.error(err);
      setCityInfo(null);
    }
  };

  // Reverse geocode lat/lon to city name using Nominatim
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
          fetchCityInfo(cityName);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  // On initial load, if lat/lon in URL, fetch city info
  useEffect(() => {
    if (hasValidCoords) {
      fetchCityByCoords(latitude, longitude);
    }
  }, [latitude, longitude]);

  // Search city by name
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
      setPosition([lat, lon]);

      // Fetch Wikipedia info for searched city
      fetchCityInfo(searchValue);
    } catch (err) {
      console.error(err);
      alert("Error searching location");
    }
  };

  return (
    <div className="w-full max-w-full h-[500px] rounded-2xl shadow-lg flex overflow-hidden">
      {/* Sidebar */}
      <div className="w-1/3 p-4 flex flex-col bg-gradient-to-b from-blue-400 to-blue-700 text-white shadow-lg overflow-auto">
        <h2 className="text-lg font-bold mb-4">Search Location</h2>
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
          className="w-full p-2 bg-blue-900 rounded text-white font-semibold hover:bg-blue-800 transition-colors mb-4"
        >
          Search
        </button>

        {/* Display city info */}
        {cityInfo && (
          <div className="bg-white text-black p-3 rounded shadow overflow-auto">
            <h3 className="font-bold mb-2">{cityInfo.title}</h3>
            <div
              className="text-sm"
              dangerouslySetInnerHTML={{ __html: cityInfo.extract }}
            />
          </div>
        )}
      </div>

      {/* Map */}
      <div className="w-2/3 h-full rounded-2xl overflow-hidden">
        <MapContainer center={position} zoom={13} scrollWheelZoom={false} className="w-full h-full">
          <MapUpdater position={position} />

          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={position}>
            <Popup>
              {hasValidCoords
                ? `${latitude?.toFixed(4)}, ${longitude?.toFixed(4)}`
                : `${position[0].toFixed(4)}, ${position[1].toFixed(4)} (Default location)`}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
