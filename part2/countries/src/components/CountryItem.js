import React from 'react';

const CountryItem = ({ country, clickHandler }) => (
  <div className="country-item">
    <p key={country.name}>{country.name}</p>
    <button onClick={clickHandler}>Show Details</button>
  </div>
);

export default CountryItem;
