"use client";

import { useState, useEffect } from "react";
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

  // Convert temperature between Celsius and Fahrenheit
  const convertTemperature = (temp: number, unit: "metric" | "imperial") => {
    if (unit === "imperial") {
      return (temp * 9) / 5 + 32; // Celsius to Fahrenheit
    } else {
      return temp; // Celsius is already in metric
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Title */}
      <h1 className="text-5xl font-bold text-center mb-6 flex items-center justify-center gap-2">
    Weather Dashboard
      </h1>

      {/* Top row (A, B, C) */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="flex-1">
          <SearchBar onSearch={fetchWeather} />
        </div>

        {/* Unit Toggle C */}
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

      {/* Error display D */}
      {error && <div className="bg-red-700 p-2 rounded mb-4 text-center">{error}</div>}

      {/* Weather content layout */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Section E/F – Left Column */}
        <div className="md:col-span-1">
          {/* F or E content */}
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

        {/* Section H – Center with main weather card */}
        <div className="md:col-span-2">
          {weather && <WeatherCard data={weather} unit={unit} />}
        </div>
      </div>

      {/* Forecast Cards I & J */}
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        {/* Box I */}
        <div className="bg-gray-800 p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">📆 3-Day Forecast (Box I)</h2>
          {weather && <ForecastCard data={weather} unit={unit} />}
        </div>

        {/* Box J */}
        <div className="bg-gray-800 p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">📊 Additional Forecast (Box J)</h2>
          {weather && (
            <ul className="text-sm space-y-1">
              <li>🌅 Sunrise: {new Date(weather.current.sunrise * 1000).toLocaleTimeString()}</li>
              <li>🌇 Sunset: {new Date(weather.current.sunset * 1000).toLocaleTimeString()}</li>
              <li>🔺 Max Temp: {convertTemperature(weather.forecast[0]?.temp_max || 0, unit).toFixed(2)}°{unit === "metric" ? "C" : "F"}</li>
              <li>🔻 Min Temp: {convertTemperature(weather.forecast[0]?.temp_min || 0, unit).toFixed(2)}°{unit === "metric" ? "C" : "F"}</li>
              <li>🌫 Visibility: {weather.current.visibility} m</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
