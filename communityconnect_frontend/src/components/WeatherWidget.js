import React, { useState, useEffect } from 'react';
import './WeatherWidget.css';

// PUBLIC_INTERFACE
/**
 * WeatherWidget displays current weather using OpenWeatherMap API.
 * City defaults to New York, can be changed by user.
 */
function WeatherWidget() {
  // Using the required weather API key for all OpenWeatherMap API requests
  const WEATHER_API_KEY = '762135b9d83533a745d83b7042c6e485';
  const [city, setCity] = useState(() => localStorage.getItem('cc-weather-city') || 'New York');
  const [weather, setWeather] = useState(null);
  const [input, setInput] = useState(city);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWeather();
    // eslint-disable-next-line
  }, [city]);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${WEATHER_API_KEY}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setWeather(data);
      } else {
        setWeather(null);
      }
    } catch {
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCityChange = (e) => setInput(e.target.value);

  const handleCitySubmit = (e) => {
    e.preventDefault();
    if (input && input !== city) {
      setCity(input);
      localStorage.setItem('cc-weather-city', input);
    }
  };

  return (
    <div className="weather-widget card">
      <h2>
        <span role="img" aria-label="weather">☀️</span> Weather
      </h2>
      <form onSubmit={handleCitySubmit} className="weather-city-form">
        <input
          type="text"
          value={input}
          onChange={handleCityChange}
          placeholder="City"
          className="weather-city-input"
          aria-label="City name"
        />
        <button className="btn" type="submit" title="Set city">Set</button>
      </form>
      {loading ? (
        <div>Loading weather...</div>
      ) : !weather || weather.cod !== 200 ? (
        <div>Weather data not found.</div>
      ) : (
        <div className="weather-main">
          <div className="weather-summary">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].main}
              className="weather-icon"
            />
            <div>
              <div className="weather-temp">{Math.round(weather.main.temp)}°C</div>
              <div className="weather-details">{weather.weather[0].main}, {weather.name}</div>
              <div className="weather-meta">Humidity: {weather.main.humidity}% | Wind: {Math.round(weather.wind.speed)} m/s</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherWidget;
