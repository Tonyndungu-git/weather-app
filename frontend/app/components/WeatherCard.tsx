interface WeatherCardProps {
  data: {
    city: string;
    current?: {
      temp: number;
      description: string;
      icon: string;
      humidity: number;
      wind_speed: number;
      pressure: number;
    };
  } | null;
  unit: "metric" | "imperial";
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data, unit }) => {
  if (!data || !data.current) {
    return (
      <div className="bg-gray-700 p-6 rounded-lg shadow-lg text-center">
        <p>No weather data available. Please search for a city.</p>
      </div>
    );
  }

  const { temp, description, icon, humidity, wind_speed, pressure } = data.current;

  const convertTemp = (temp: number) =>
    unit === "imperial" ? ((temp * 9) / 5 + 32).toFixed(1) : temp.toFixed(1);

  const getTempUnitSymbol = () => (unit === "metric" ? "°C" : "°F");
  const getWindSpeedUnit = () => (unit === "metric" ? "m/s" : "mph");

  return (
    <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-2">📍 {data.city}</h2>
      <h3 className="text-lg text-gray-300 mb-4">Current Weather</h3>

      <div className="flex items-center justify-center mb-4">
        <img
          src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={description}
        />
        <div className="ml-4">
          <p className="text-3xl font-bold">
            {convertTemp(temp)} {getTempUnitSymbol()}
          </p>
          <p className="text-lg capitalize">{description}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-xl">{humidity}%</p>
          <p className="text-sm text-gray-400">Humidity</p>
        </div>
        <div>
          <p className="text-xl">
            {wind_speed} {getWindSpeedUnit()}
          </p>
          <p className="text-sm text-gray-400">Wind Speed</p>
        </div>
        <div>
          <p className="text-xl">{pressure} hPa</p>
          <p className="text-sm text-gray-400">Pressure</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
