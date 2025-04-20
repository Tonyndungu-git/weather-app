import { WiStrongWind, WiHumidity, WiBarometer } from "react-icons/wi";

interface WeatherCardProps {
  data: {
    current: {
      temp: number;
      description: string;
      icon: string;
      humidity: number;
      wind_speed: number;
      pressure: number;
    };
  };
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  const current = data.current;
  return (
    <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Current Weather</h2>
      <div className="flex items-center justify-center mb-4">
        <img
          src={`http://openweathermap.org/img/wn/${current.icon}@2x.png`}
          alt={current.description}
        />
        <div className="ml-4">
          <p className="text-3xl font-bold">{current.temp}°C</p>
          <p className="text-lg">{current.description}</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center">
          <WiHumidity className="text-blue-500" />
          <p className="mt-2">{current.humidity}%</p>
          <p className="text-sm">Humidity</p>
        </div>
        <div className="flex flex-col items-center">
          <WiStrongWind className="text-green-500" />
          <p className="mt-2">{current.wind_speed} m/s</p>
          <p className="text-sm">Wind Speed</p>
        </div>
        <div className="flex flex-col items-center">
          <WiBarometer className="text-yellow-500" />
          <p className="mt-2">{current.pressure} hPa</p>
          <p className="text-sm">Pressure</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
