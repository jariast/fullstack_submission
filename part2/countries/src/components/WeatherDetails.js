import React from 'react';

const WeatherDetails = ({ country, weatherData }) => (
  <>
    <h2>{`Weather in ${country.capital}`}</h2>
    <p>
      <span>Temperature: </span>
      {`${weatherData.temperature} celsius`}
    </p>
    <img alt="weather_icon" src={weatherData.weather_icons[0]}></img>
    <p>
      <span>Wind: </span>
      {`${weatherData.wind_speed} kmh direction ${weatherData.wind_dir}`}
    </p>
  </>
);
export default WeatherDetails;
