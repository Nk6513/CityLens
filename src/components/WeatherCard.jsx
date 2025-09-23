import React from 'react';

const WeatherCard = () => {
  return (
    <div className="max-w-sm bg-white shadow-lg rounded-xl p-6 m-4 text-center">
      <h2 className="text-2xl font-bold mb-2">City Name</h2>
      <p className="text-gray-500 mb-4">Sunny • 25°C</p>

      <div className="flex justify-center items-center mb-4">
        <img
          src="https://openweathermap.org/img/wn/01d@2x.png"
          alt="weather icon"
          className="w-20 h-20"
        />
      </div>

      <div className="flex justify-around text-gray-700 mt-4">
        <div>
          <p className="font-semibold">Humidity</p>
          <p>60%</p>
        </div>
        <div>
          <p className="font-semibold">Wind</p>
          <p>15 km/h</p>
        </div>
        <div>
          <p className="font-semibold">Pressure</p>
          <p>1012 hPa</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
