import { useState } from "react";

interface SearchBarProps {
  onSearch: (city: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <div className="flex justify-between items-center bg-gray-600 p-4 rounded-lg mb-4">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="bg-gray-800 text-white p-2 rounded-l-lg focus:outline-none"
        placeholder="Enter city name"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded-r-lg"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
