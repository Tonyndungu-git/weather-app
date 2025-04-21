"use client";

import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";
import { WeatherData } from "../../types/weather";

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchWeather = async (city: string) => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/weather?city=${city}&unit=${unit}`
      );
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      setWeather(data);
      setError(null);
    } catch (err) {
      setWeather(null);
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const convertTemperature = (temp: number, unit: "metric" | "imperial") => {
    return unit === "imperial" ? (temp * 9) / 5 + 32 : temp;
  };

  const formatTime = (timestamp?: number) =>
    timestamp ? new Date(timestamp * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "N/A";

  return (
    
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Title */}
      <h1 className="text-5xl font-bold text-center mb-2 flex items-center justify-center gap-2">
      🌍 Weather Dashboard
      </h1>

      {weather && (
        <p className="text-center text-xl text-gray-300 mb-6">
          Showing results for{" "}
          <span className="font-semibold text-white">{weather.location}</span>
        </p>
      )}



      {/* Top Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="flex-1">
          <SearchBar onSearch={fetchWeather} />
        </div>

        <div className="flex gap-2 mt-2 md:mt-0">
          <button
            onClick={() => setUnit("metric")}
            className={`px-3 py-1 rounded ${unit === "metric" ? "bg-blue-600" : "bg-gray-700"}`}
          >
            °C
          </button>
          <button
            onClick={() => setUnit("imperial")}
            className={`px-3 py-1 rounded ${unit === "imperial" ? "bg-blue-600" : "bg-gray-700"}`}
          >
            °F
          </button>
        </div>
      </div>

      {/* Error Display */}
      {error && <div className="bg-red-700 p-2 rounded mb-4 text-center">{error}</div>}

      {/* Main Weather Info */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Left Panel */}
        <div className="md:col-span-1">
          <div className="bg-gray-800 p-4 rounded mb-4">
            <h2 className="text-lg font-semibold mb-2">📍 Weather Info Panel</h2>
            {weather && (
              <ul className="text-sm space-y-1">
                <li>🌡 Temperature: {convertTemperature(weather.current.temp, unit).toFixed(2)}°{unit === "metric" ? "C" : "F"}</li>
                <li>💧 Humidity: {weather.current.humidity}%</li>
                <li>🌬 Wind: {weather.current.wind_speed} {unit === "metric" ? "m/s" : "mph"}</li>
                <li>☁️ Description: {weather.current.description}</li>
              </ul>
            )}
          </div>
        </div>

        {/* Center – Large Weather Display */}
        <div className="md:col-span-2">
          {weather && (
            <div className="bg-gradient-to-br from-blue-700 to-indigo-800 p-8 rounded-xl text-center shadow-lg animate-fade-in">
              <div className="text-6xl mb-2">⛅</div>
              <h2 className="text-4xl font-bold mb-1">{weather.city} Weather</h2>
              <p className="text-sm text-gray-200 mb-4">
                {new Date().toLocaleDateString(undefined, {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                | {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
              <p className="text-2xl font-semibold capitalize">{weather.current.description}</p>
              <p className="text-5xl font-bold mt-2">
                {convertTemperature(weather.current.temp, unit).toFixed(1)}°{unit === "metric" ? "C" : "F"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Forecast Panels */}
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        {/* 3-Day Forecast */}
        <div className="bg-gray-800 p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">📆 3-Day Forecast</h2>
          {weather && <ForecastCard data={weather} unit={unit} />}
        </div>

        {/* Additional Info */}
        <div className="bg-gray-800 p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">📊 Additional Forecast</h2>
          {weather && (
            <ul className="text-sm space-y-1">
              <li>🌅 Sunrise: {formatTime(weather.current.sunrise)}</li>
              <li>🌇 Sunset: {formatTime(weather.current.sunset)}</li>
              <li>🔺 Max Temp: {convertTemperature(weather.forecast?.[0]?.temp_max || 0, unit).toFixed(2)}°{unit === "metric" ? "C" : "F"}</li>
              <li>🔻 Min Temp: {convertTemperature(weather.forecast?.[0]?.temp_min || 0, unit).toFixed(2)}°{unit === "metric" ? "C" : "F"}</li>
              <li>🌫 Visibility: {weather.current.visibility ?? "N/A"} m</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
