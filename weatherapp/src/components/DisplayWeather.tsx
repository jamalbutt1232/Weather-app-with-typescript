import React, { useState } from "react";

interface WeatherItem {
  id: number;
  city: string;
  temperature: number;
}

const WeatherApp: React.FC = () => {
  const [weatherItems, setWeatherItems] = useState<WeatherItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleAdd = () => {
    if (searchQuery.trim() === "") {
      return;
    }

    const newWeatherItem: WeatherItem = {
      id: weatherItems.length + 1,
      city: searchQuery.trim(),
      temperature: Math.floor(Math.random() * 40),
    };
    setWeatherItems([...weatherItems, newWeatherItem]);
    setSearchQuery("");
  };

  const handleDelete = (id: number) => {
    const updatedWeatherItems = weatherItems.filter((item) => item.id !== id);
    setWeatherItems(updatedWeatherItems);
  };

  const handleSearch = () => {
    console.log(`Searching for: ${searchQuery}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Weather App</h1>
      <div className="flex space-x-4 mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleAdd}
        >
          Add
        </button>
        <input
          type="text"
          placeholder="Search city..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded w-64 focus:outline-none focus:border-blue-500"
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <ul>
        {weatherItems.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between border-b border-gray-200 py-2"
          >
            <span className="text-lg">
              {item.city} - {item.temperature}°C
            </span>
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              onClick={() => handleDelete(item.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeatherApp;
