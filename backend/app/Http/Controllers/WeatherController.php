<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class WeatherController extends Controller
{
    /**
     * Fetch current weather and 3-day forecast for a given city.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getWeather(Request $request)
    {
        $city = $request->query('city', 'Nairobi');
        $units = $request->query('units', 'metric'); // 'metric' for Celsius, 'imperial' for Fahrenheit
        $apiKey = env('OPENWEATHERMAP_API_KEY'); // Replace with env('OPENWEATHERMAP_API_KEY') in prod

        if (!$apiKey) {
            Log::error('API key for OpenWeatherMap is missing in .env file');
            return response()->json(['error' => 'API key not configured.'], 500);
        }

        try {
            // Fetch current weather data
            $currentWeather = Http::get('https://api.openweathermap.org/data/2.5/weather', [
                'q' => $city,
                'appid' => $apiKey,
                'units' => $units,
            ]);

            // Fetch 5-day / 3-hour forecast data
            $forecastData = Http::get('https://api.openweathermap.org/data/2.5/forecast', [
                'q' => $city,
                'appid' => $apiKey,
                'units' => $units,
            ]);

            if (!$currentWeather->successful() || !$forecastData->successful()) {
                Log::error('Weather API request failed', [
                    'current' => $currentWeather->json(),
                    'forecast' => $forecastData->json(),
                ]);
                return response()->json([
                    'error' => 'Failed to fetch weather data',
                    'details' => [
                        'current' => $currentWeather->json(),
                        'forecast' => $forecastData->json(),
                    ]
                ], 502);
            }

            // Extract relevant fields from current weather
            $current = $currentWeather->json();
            $location = $current['name'];
            $currentDetails = [
                'temp' => $current['main']['temp'],
                'description' => $current['weather'][0]['description'],
                'icon' => $current['weather'][0]['icon'],
                'humidity' => $current['main']['humidity'],
                'wind_speed' => $current['wind']['speed'],
            ];

            // Filter forecast for 3 next days at 12:00:00
            $forecastList = collect($forecastData->json()['list']);
            $dailyForecast = $forecastList
                ->filter(fn($item) => str_contains($item['dt_txt'], '12:00:00'))
                ->take(3)
                ->values()
                ->map(fn($item) => [
                    'date' => $item['dt_txt'],
                    'temp' => $item['main']['temp'],
                    'description' => $item['weather'][0]['description'],
                    'icon' => $item['weather'][0]['icon'],
                ]);

            return response()->json([
                'location' => $location,
                'units' => $units,
                'date' => now()->toDateString(),
                'current' => $currentDetails,
                'forecast' => $dailyForecast,
            ]);
        } catch (\Exception $e) {
            Log::error('Weather API request failed with exception: ' . $e->getMessage());
            return response()->json([
                'error' => 'Failed to fetch weather data due to an internal error.',
                'details' => $e->getMessage(),
            ], 500);
        }
    }
}
