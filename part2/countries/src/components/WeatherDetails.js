import React from 'react';

const WeatherDetails = ({ country }) => (
  <>
    <h2>{`Weather in ${country.capital}`}</h2>
    <p>
      <span>Temperature: </span>
      {`${country.weatherData.temperature} celsius`}
    </p>
    <img alt="weather_icon" src={country.weatherData.weather_icons[0]}></img>
    <p>
      <span>Wind: </span>
      {`${country.weatherData.wind_speed} kmh direction ${country.weatherData.wind_dir}`}
    </p>
  </>
);
export default WeatherDetails;
