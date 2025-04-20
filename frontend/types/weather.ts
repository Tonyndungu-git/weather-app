export interface WeatherData {
  location: string;
  units: "metric" | "imperial";
  date: string;
  current: {
    temp: number;
    description: string;
    icon: string;
    humidity: number;
    wind_speed: number;
  };
  forecast: {
    date: string;
    temp: number;
    description: string;
    icon: string;
  }[];
}
