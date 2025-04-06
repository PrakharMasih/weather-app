import { useState, useEffect, useRef } from 'react';
import './App.css';
import icon from './image/icon.png';

function App() {
  const [input, setInput] = useState('');
  const [weather, setWeather] = useState(null);
  const [history, setHistory] = useState([]);
  const debounceRef = useRef(null);

  const updateHistory = (city) => {
    const cityLower = city.toLowerCase();
    const updated = [cityLower, ...history.filter(c => c.toLowerCase() !== cityLower)];
    if (updated.length > 5) updated.pop();
    setHistory(updated);
  };

  
  const fetchWeather = async (city) => {
    try {
      const response = await fetch("http://127.0.0.1:9000/getCurrentWeather", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          city,
          output_format: "json",
        }),
      });

      if (!response.ok) throw new Error("City not found");

      const data = await response.json();
      setWeather(data);
      updateHistory(city);
    } catch (error) {
      setWeather(null);
    }
  };

  useEffect(() => {
    if (!input.trim()) return;

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      fetchWeather(input.trim());
    }, 500);   //500ms

    return () => clearTimeout(debounceRef.current);
  }, [input]);

  return (
    <div className="card">
      <div className="search">
        <input
          placeholder="Search the location..."
          type="search"
          className="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

      {history.length > 0 && (
        <div className="history">
          <p>Recent Searches:</p>
          <ul>
            {history.map((city, index) => (
              <li key={index} onClick={() => setInput(city)}>
                {city.charAt(0).toUpperCase() + city.slice(1)}
              </li>
            ))}
          </ul>
        </div>
      )}

      {!weather ? (
        <p>Get Current City Weather Report</p>
      ) : (
        <div>
          <div className="content">
            <div className="img">
              <img src={icon} alt="icon" />
            </div>
            <h2 className="city">{weather.City}</h2>
          </div>

          <div className="temp-content">
            <h1 className="temp">{weather.Temperature}</h1>
            <p className="temp-info">
              Latitude: {weather.Latitude} | Longitude: {weather.Longitude}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
