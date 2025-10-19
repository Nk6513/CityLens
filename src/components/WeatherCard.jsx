import { Link } from "react-router-dom";
import { useLocation } from "../LocationContext";

// ---------------------------------------------------------------
// WeatherCard Component
// ---------------------------------------------------------------

const WeatherCard = ({ error, showAlert }) => {
  // --------------------------------------------------
  // Extact context
  // --------------------------------------------------

  const { weatherData } = useLocation();

  // --------------------------------------------------
  // Handle error when no city is found
  // --------------------------------------------------
  if (error) {
    return (
      <div className="max-w-4xl w-full bg-red-100 text-red-800 shadow-lg rounded-2xl p-6 m-6 text-center">
        <p className="text-xl font-semibold">⚠️ {error}</p>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className="flex justify-center mt-10 px-4">
        <div className="flex items-center border-l-4 border-blue-700 bg-blue-400 px-6 py-4 rounded-r-lg shadow-md max-w-xl">
          <p className="text-md font-semibold leading-relaxed font-sans text-white-900">
            No city selected yet. Search a city on the homepage to see details.
          </p>
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // Extract values safely
  // --------------------------------------------------
  const { temp, temp_min, temp_max, humidity } = weatherData?.main || {};
  const cityName = weatherData?.name;
  const country = weatherData?.country || weatherData?.sys?.country;
  const lat = weatherData?.coord?.lat;
  const lon = weatherData?.coord?.lon;
  const rawdate = weatherData?.coord?.dt || weatherData.dt;
  const date = new Date(rawdate * 1000);
  const windSpeedMps = weatherData?.wind?.speed;
  const windSpeedKmh = windSpeedMps * 3.6;
  const weather = weatherData?.weather?.[0];
  const icon = weather?.icon;
  const description = weather?.weather?.[0]?.description?.toLowerCase();

  // --------------------------------------------------
  // Generate alerts based on conditions
  // --------------------------------------------------
  const alerts = [];

  if (temp_max >= 28) {
    alerts.push({
      type: "red",
      message:
        "⚠️ Heatwave warning: Stay hydrated and avoid prolonged sun exposure.",
    });
  }
  if (temp_min <= 0) {
    alerts.push({
      type: "blue",
      message: "⚠️ Freezing temperatures: Risk of frostbite and icy roads.",
    });
  }
  if (humidity >= 85) {
    alerts.push({
      type: "yellow",
      message:
        "⚠️ High humidity: Possible discomfort and increased chance of storms.",
    });
  }
  if (windSpeedKmh >= 30) {
    alerts.push({
      type: "orange",
      message: "⚠️ Strong wind advisory: Secure loose objects outdoors.",
    });
  }
  if (description?.includes("storm") || description?.includes("thunder")) {
    alerts.push({
      type: "purple",
      message: "⚠️ Thunderstorm risk: Stay indoors during severe weather.",
    });
  }
  if (alerts.length === 0) {
    alerts.push({
      type: "green",
      message: "✅ No severe weather alerts at the moment.",
    });
  }

  const colorMap = {
    red: "bg-red-600 text-white",
    blue: "bg-blue-600 text-white",
    yellow: "bg-yellow-600 text-white",
    orange: "bg-orange-600 text-white",
    purple: "bg-purple-600 text-white",
    green: "bg-green-600 text-white",
  };

  // --------------------------------------------------
  // Render
  // --------------------------------------------------
  return (
    <div className="relative max-w-4xl w-full bg-gradient-to-r from-blue-400 via-blue-90 to-white shadow-2xl rounded-2xl p-10 m-6 text-center">
      {/* ---------------- Show alert in Ribbon ---------------- */}
      {showAlert && (
        <div
          className={`absolute top-0 left-0 w-full py-2 rounded-t-xl rounded-b-none overflow-hidden ${
            colorMap[alerts[0].type]
          }`}
        >
          <div className="text-center">{alerts[0].message}</div>
        </div>
      )}

      {/* ---------------- Render weather forecast about the serached city ---------------- */}

      <h2 className="text-4xl font-extrabold mb-2 pt-12 sm:pt-6 text-blue-900">
        {cityName}, {country}
      </h2>

      {date && (
        <p className="text-lg text-gray-600 mb-4">
          {date.toLocaleDateString("en-US", {
            weekday: "long", // Friday
            month: "long", // March
            day: "numeric", // 15
            year: "numeric", // 2025
          })}
        </p>
      )}

      {lat && lon && (
        <p className="text-xs text-center mb-6">
          <span className="inline-flex items-center bg-blue-500 text-white text-center font-semibold px-3 py-1.5 shadow-md transition-all duration-200 hover:bg-blue-600 hover:shadow-lg">
            <Link to={`/map/${lat}/${lon}`}>
              <button className="font-semibold">View on Map</button>
            </Link>
          </span>
        </p>
      )}

      {icon && (
        <div className="flex justify-center items-center mb-6">
          <img
            src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
            alt="weather icon"
            className="w-32 h-32"
          />
        </div>
      )}

      <p className="text-xl text-gray-700 mb-6">
        {weather?.description} • {temp}°C
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-gray-700 mt-6">
        <div>
          <p className="font-semibold text-lg mb-1">Min Temp</p>
          <p className="text-lg text-blue-600">{temp_min}°C</p>
        </div>
        <div>
          <p className="font-semibold text-lg mb-1">Max Temp</p>
          <p className="text-lg text-red-600">{temp_max}°C</p>
        </div>
        <div>
          <p className="font-semibold text-lg mb-1">Humidity</p>
          <p className="text-lg">{humidity}%</p>
        </div>
        <div>
          <p className="font-semibold text-lg mb-1">Wind</p>
          <p className="text-lg">{Math.round(windSpeedKmh)} km/h</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
