interface ForecastCardProps {
  data: {
    forecast: {
      date: string;
      temp: number;
      description: string;
      icon: string;
    }[];
  };
  unit: 'metric' | 'imperial';
}

const ForecastCard: React.FC<ForecastCardProps> = ({ data, unit }) => {
  const unitSymbol = unit === 'imperial' ? '°F' : '°C';

  // Optional: convert temperature client-side (if backend doesn't support `unit`)
  const convertTemperature = (temp: number): number =>
    unit === 'imperial' ? (temp * 9) / 5 + 32 : temp;

  return (
    <div className="bg-gray-700 p-6 rounded-lg shadow-lg mt-4">
      <h2 className="text-2xl font-semibold mb-4">3-Day Forecast</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {Array.isArray(data.forecast) && data.forecast.length > 0 ? (
          data.forecast.map((day, index) => (
            <div
              key={index}
              className="bg-gray-600 rounded-lg p-4 flex flex-col items-center"
            >
              <h4 className="text-xl font-semibold">
                {new Date(day.date).toLocaleDateString()}
              </h4>
              <img
                src={`http://openweathermap.org/img/wn/${day.icon}@2x.png`}
                alt={day.description}
              />
              <p className="text-xl">
                {Math.round(convertTemperature(day.temp))}{unitSymbol}
              </p>
              <p className="text-sm">{day.description}</p>
            </div>
          ))
        ) : (
          <p>No forecast data available.</p>
        )}
      </div>
    </div>
  );
};

export default ForecastCard;
