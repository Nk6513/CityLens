import React from "react";

const AlertsPanel = ({ weatherData, showAlert}) => {
  if (!weatherData) return null;
  if(!showAlert) return null;

  const currentWeather = weatherData;
  const { temp_min, temp_max, humidity } = currentWeather?.main || {};
  const windSpeed = currentWeather?.wind?.speed;
  const description = currentWeather?.weather?.[0]?.description?.toLowerCase();

  // --------------------------------------------------
  // Generate alerts based on conditions
  // --------------------------------------------------
  const alerts = [];

  if (temp_max >= 35) {
    alerts.push({
      type: "red",
      message: "⚠️ Heatwave warning: Stay hydrated and avoid prolonged sun exposure.",
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
      message: "⚠️ High humidity: Possible discomfort and increased chance of storms.",
    });
  }

  if (windSpeed >= 50) {
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

  // Default “all clear”
  if (alerts.length === 0) {
    alerts.push({
      type: "green",
      message: "✅ No severe weather alerts at the moment.",
    });
  }

  // --------------------------------------------------
  // Tailwind color mapping
  // --------------------------------------------------
  const colorMap = {
    red: "bg-red-100 text-red-800",
    blue: "bg-blue-100 text-blue-800",
    yellow: "bg-yellow-100 text-yellow-800",
    orange: "bg-orange-100 text-orange-800",
    purple: "bg-purple-100 text-purple-800",
    green: "bg-green-100 text-green-800",
  };

  // --------------------------------------------------
  // Render
  // --------------------------------------------------
  return  (
    <div id="alert-container" className="max-w-3xl mx-auto bg-gradient-to-r from-blue-400 via-blue-200 to-blue-50 shadow-lg rounded-xl p-6 m-4 overflow-hidden">
      <h2 className="text-xl font-bold mb-4 text-center text-blue-600">
        Weather Alerts
      </h2>

      <ul className="flex flex-wrap sm:flex-nowrap space-x-0 sm:space-x-4 justify-center">
        {alerts.map((alert, idx) => (
          <li key={idx} className={`${colorMap[alert.type]} p-3 rounded-md flex justify-center items-center w-full sm:w-auto mb-2 sm:mb-0`}         >
            {alert.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlertsPanel;
