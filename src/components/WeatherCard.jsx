const WeatherCard = ({ weatherData }) => {
  if (!weatherData) return null;

  const { name, weather, main, wind } = weatherData;
  const icon = weather[0].icon;

  return (
    <div className="max-w-4xl w-full bg-gradient-to-r from-blue-300 via-blue-50 to-white shadow-2xl rounded-2xl p-10 m-6 text-center transition-transform transform hover:scale-105">
      <h2 className="text-4xl font-extrabold mb-4 text-blue-900">{name}</h2>
      <p className="text-xl text-gray-600 mb-6">
        {weather[0].description} • {main.temp}°C
      </p>

      <div className="flex justify-center items-center mb-6">
        <img
          src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
          alt="weather icon"
          className="w-32 h-32"
        />
      </div>

      <div className="flex justify-around text-gray-700 mt-6 space-x-8">
        <div>
          <p className="font-semibold text-lg mb-1">Humidity</p>
          <p className="text-lg">{main.humidity}%</p>
        </div>
        <div>
          <p className="font-semibold text-lg mb-1">Wind</p>
          <p className="text-lg">{wind.speed} km/h</p>
        </div>
        <div>
          <p className="font-semibold text-lg mb-1">Pressure</p>
          <p className="text-lg">{main.pressure} hPa</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
