# Wicked Weather Dashboard

Welcome to the **Wicked Weather Dashboard**! This project provides real-time weather data based on the user's city input, with options to toggle between Celsius and Fahrenheit for temperature units. It features a clean UI powered by **Tailwind CSS**, allowing users to easily search for weather information and view current conditions as well as a 3-day forecast. The backend is built using **PHP Laravel** and serves as the weather data API.

## Features

- **Current Weather Info**: Displays current temperature, humidity, wind speed, and weather description.
- **Unit Toggle**: Allows the user to toggle between Celsius (°C) and Fahrenheit (°F).
- **3-Day Forecast**: Provides a 3-day weather forecast for the searched city.
- **Search Functionality**: The user can search for weather data based on the city name.
- **Responsive Design**: The UI is responsive and works seamlessly on both desktop and mobile devices.

## Tech Stack

- **Frontend**: 
  - **React**: For building the user interface.
  - **Tailwind CSS**: For styling the components.
  - **TypeScript**: For type safety and better developer experience.
  
- **Backend**: 
  - **PHP Laravel**: Used to build the weather data API and handle server-side logic.
  
- **API Integration**: 
  - Fetches real-time weather data from external weather data providers (like OpenWeatherMap) using the Laravel backend.
  
- **State Management**:
  - React hooks for managing state (`useState`, `useEffect`).

## Installation

### 1. Clone the repository:

```bash
git clone https://github.com/your-username/wicked-weather-dashboard.git
```

### 2. Install frontend dependencies:

Make sure you have **Node.js** and **npm** installed, then run the following commands:

```bash
cd wicked-weather-dashboard/frontend
npm install
```

### 3. Install backend dependencies:

Make sure you have **PHP** and **Composer** installed. Navigate to the backend folder and run:

```bash
cd wicked-weather-dashboard/backend
composer install
```

### 4. Set up your .env file (Backend):

Copy the `.env.example` file and create a `.env` file with the following content:

```bash
APP_NAME=WickedWeather
APP_ENV=local
APP_KEY=base64:your-app-key
APP_DEBUG=true
APP_URL=http://localhost

WEATHER_API_KEY=your-weather-api-key
```

Replace `your-app-key` with the Laravel application key generated using `php artisan key:generate`, and `your-weather-api-key` with the key from the weather API provider.

### 5. Run the backend server:

Start the Laravel backend server:

```bash
php artisan serve
```

This will run the backend on `http://localhost:8000`.

### 6. Start the frontend development server:

In the frontend directory, run:

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser to view the application.

## Usage

1. **Search for a city**: Type the name of a city in the search bar and press enter to fetch weather data from the Laravel API.
2. **Toggle temperature unit**: Click on the **°C** or **°F** button to switch between Celsius and Fahrenheit units.
3. **View weather information**: After searching for a city, the current weather and 3-day forecast will be displayed in an organized format.

### Current Weather Box

- Displays current temperature, humidity, wind speed, and a brief weather description.
- The temperature will adjust based on the selected unit (Celsius or Fahrenheit).

### 3-Day Forecast

- Displays weather conditions for the next 3 days, including the temperature and weather description.

## Backend API (Laravel)

The Laravel backend exposes the following endpoints:

### `GET /api/weather`

Fetches weather data for a specified city and unit.

**Query Parameters:**

- `city` (string, required): The name of the city (e.g., "California").
- `unit` (string, optional): The unit for temperature. Use `metric` for Celsius (default) or `imperial` for Fahrenheit.

Example request:

```bash
GET /api/weather?city=California&unit=metric
```

**Response:**

```json
{
  "current": {
    "temp": 22.94,
    "humidity": 47,
    "wind_speed": 5.66,
    "description": "clear sky",
    "sunrise": 1619588571,
    "sunset": 1619645067
  },
  "forecast": [
    {
      "date": "2025-04-21",
      "temp_max": 14.8,
      "temp_min": 10.5,
      "description": "overcast clouds"
    },
    {
      "date": "2025-04-22",
      "temp_max": 16.75,
      "temp_min": 12.8,
      "description": "light rain"
    },
    {
      "date": "2025-04-23",
      "temp_max": 12.85,
      "temp_min": 8.2,
      "description": "overcast clouds"
    }
  ]
}
```

## Contributing

Contributions are welcome! Feel free to fork the project and submit pull requests for bug fixes, feature improvements, or new ideas.

1. Fork the repository
2. Create your branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature-name`)
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

---
