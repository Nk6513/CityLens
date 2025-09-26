const WeatherCard = ({ weatherData, error }) => {
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

  if (!weatherData) return null;

  // --------------------------------------------------
  // Detect API type (forecast or current)
  // --------------------------------------------------
  const currentWeather = weatherData;

  // --------------------------------------------------
  // Extract values safely
  // --------------------------------------------------
  const { temp, temp_min, temp_max, humidity } = currentWeather?.main || {};
  const cityName = currentWeather?.name;
  const country = currentWeather?.country || currentWeather?.sys?.country;
  const lat = currentWeather?.coord?.lat;
  const lon = currentWeather?.coord?.lon;
  const rawdate = currentWeather?.coord?.dt || currentWeather.dt;
  const date = new Date(rawdate * 1000);
  const windSpeed = currentWeather?.wind?.speed;
  const weather = currentWeather?.weather?.[0];
  const icon = weather?.icon;

  // --------------------------------------------------
  // Render
  // --------------------------------------------------
  return (
    <div className="max-w-4xl w-full bg-gradient-to-r from-blue-300 via-blue-50 to-white shadow-2xl rounded-2xl p-10 m-6 text-center transition-transform transform hover:scale-105">
      <h2 className="text-4xl font-extrabold mb-2 text-blue-900">
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
          <a
            href={`https://www.google.com/maps?q=${lat},${lon}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-blue-800"
          >
            Lat: {lat}, Lon: {lon}
          </a>
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
          <p className="text-lg">{windSpeed} km/h</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
