// components/WeatherCard.tsx
"use client";

import { WeatherData } from "../../types/weather";

interface WeatherCardProps {
  data: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  if (!data?.current) {
    return <div className="text-center text-gray-500">Weather data is unavailable.</div>;
  }

  const { temp, description, icon, humidity, wind_speed } = data.current;

  return (
    <div className="card bg-base-100 shadow-xl p-6 text-center">
      <h2 className="text-2xl font-bold mb-2">{data.location}</h2>

      <img
        src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={description}
        className="mx-auto"
      />
      <p className="text-lg capitalize">{description}</p>
      <p className="text-xl mt-2">🌡 {temp}°{data.units === 'metric' ? 'C' : 'F'}</p>
      <p>💧 Humidity: {humidity}%</p>
      <p>💨 Wind Speed: {wind_speed} {data.units === 'metric' ? 'm/s' : 'mph'}</p>

      {data.forecast && data.forecast.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">3-Day Forecast</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.forecast.map((day, idx) => (
              <div key={idx} className="bg-base-200 p-4 rounded-lg">
                <p className="font-medium">{new Date(day.date).toDateString()}</p>
                <img
                  src={`http://openweathermap.org/img/wn/${day.icon}@2x.png`}
                  alt={day.description}
                  className="mx-auto"
                />
                <p>{day.temp}°{data.units === 'metric' ? 'C' : 'F'}</p>
                <p className="capitalize">{day.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
