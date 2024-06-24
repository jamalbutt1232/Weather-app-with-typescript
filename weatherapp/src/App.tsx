import React from "react";
import "./index.css";
import DisplayWeather from "./components/DisplayWeather";

const App: React.FC = () => {
  return (
    <div className="bg-gray-200 min-h-screen flex justify-center items-center">
      <div className="max-w-lg p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-4">Weather App</h1>
        <DisplayWeather />
      </div>
    </div>
  );
};

export default App;
