import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface WeatherItem {
  id: number;
  city: string;
  temperature: number;
}

const WeatherApp: React.FC = () => {
  const [weatherItems, setWeatherItems] = useState<WeatherItem[]>(() => {
    const savedItems = localStorage.getItem("weatherItems");
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("weatherItems", JSON.stringify(weatherItems));
  }, [weatherItems]);

  const handleAdd = () => {
    if (searchQuery.trim() === "") {
      return;
    }

    const newWeatherItem: WeatherItem = {
      id:
        weatherItems.length > 0
          ? weatherItems[weatherItems.length - 1].id + 1
          : 1,
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
    if (searchQuery.trim() === "") {
      return;
    }

    fetchWeatherData(searchQuery.trim());
  };

  const fetchWeatherData = (city: string, itemIndex?: number) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=c8c75742fd6250ff469d3a84c8034b7c`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch weather data for ${city}`);
        }
        return response.json();
      })
      .then((data) => {
        if (itemIndex !== undefined && itemIndex !== null) {
          const updatedItems = [...weatherItems];
          updatedItems[itemIndex] = {
            ...updatedItems[itemIndex],
            city: data.name,
            temperature: data.main.temp,
          };
          setWeatherItems(updatedItems);
          toast.success(`Temperature updated for ${data.name}`);
        } else {
          const newWeatherItem: WeatherItem = {
            id: Date.now(),
            city: data.name,
            temperature: data.main.temp,
          };
          setWeatherItems([...weatherItems, newWeatherItem]);
        }
        setSearchQuery("");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast.error(`City not found: ${city}`);
      });
  };

  const handleEdit = (id: number, editedCity: string) => {
    const itemIndex = weatherItems.findIndex((item) => item.id === id);

    if (itemIndex !== -1) {
      fetchWeatherData(editedCity.trim(), itemIndex);
    } else {
      console.warn(`Item with id ${id} not found.`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Forecast</h1>
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
              {item.city} {item.temperature}°C
            </span>
            <div>
              <button
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2"
                onClick={() => {
                  const editedCity = prompt("Enter new city name:", item.city);
                  if (editedCity !== null && editedCity !== item.city) {
                    handleEdit(item.id, editedCity);
                  }
                }}
              >
                Edit
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <ToastContainer />
    </div>
  );
};

export default WeatherApp;
