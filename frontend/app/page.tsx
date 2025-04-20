// app/page.tsx or pages/index.tsx
"use client";

import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import { WeatherData } from "../../types/weather";

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (city: string) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/weather?city=${city}`);
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      setWeather(data);
      setError(null);
    } catch (err) {
      setWeather(null);
      setError((err as Error).message);
    }
  };

  return (
    <div className="min-h-screen p-4 bg-base-200">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-4">🌤 Weather App</h1>
        <SearchBar onSearch={fetchWeather} />
        {error && <div className="alert alert-error mt-2">{error}</div>}
        {weather && <WeatherCard data={weather} />}
      </div>
    </div>
  );
}
