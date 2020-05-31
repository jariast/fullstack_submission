import React from 'react';

import Languages from './Languages';

const CountryDetails = ({ country }) => (
  <>
    <h1>{country.name}</h1>
    <p>{`Capital: ${country.capital}`}</p>
    <p>{`Population: ${country.population}`}</p>
    <Languages languages={country.languages}></Languages>
    <img alt={country.name} src={country.flag}></img>
  </>
);

export default CountryDetails;