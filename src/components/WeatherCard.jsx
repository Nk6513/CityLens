import { Link } from "react-router-dom";

const WeatherCard = ({ weatherData, error, showAlert }) => {
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
      <div className="flex justify-center items-center mt-10">
        <p className="text-gray-600 text-lg">
          No city selected yet. Search a city on the homepage to see details.
        </p>
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
      {/* Ribbon */}
      {showAlert && (
        <div
          className={`absolute top-0 left-0 w-full py-2 rounded-t-xl rounded-b-none overflow-hidden ${
            colorMap[alerts[0].type]
          }`}
        >
          <div className="font-bold text-center">
            {alerts[0].message}
          </div>
        </div>
      )}

      <h2 className="text-4xl font-extrabold mb-2 pt-12 sm:pt-6 text-blue-900">
        {cityName}, {country}
      </h2>

      {date && (
        <p className="text-lg text-gray-600 mb-4">{date.toLocaleString()}</p>
      )}

      <p className="text-xl text-gray-700 mb-6">
        {weather?.description} • {temp}°C
      </p>

      {icon && (
        <div className="flex justify-center items-center mb-6">
          <img
            src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
            alt="weather icon"
            className="w-32 h-32"
          />
        </div>
      )}

      {lat && lon && (
        <p className="text-sm text-blue-600 text-center mb-6">
          📍{" "}
          <Link to={`/map/${lat}/${lon}`}>
            <button className="map-btn">View on Map</button>
          </Link>
        </p>
      )}

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
