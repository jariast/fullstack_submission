import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Filter from './components/Filter';

function App() {
  const filterLbl = 'Find countries by name';
  const tooManyMatchesWarning = 'Too many matches, please narrow your filter.';
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [filter, setFilter] = useState('');
  const [showWarning, setShowWarning] = useState(false);

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then((response) => setCountries(response.data));
  };
  useEffect(hook, []);

  const handleFilterChange = (event) => {
    const inputValue = event.target.value;
    setFilter(inputValue);
    filterCountriesByName(inputValue);
  };

  const filterCountriesByName = (filterString) => {
    const filteredList = countries.filter((country) =>
      country.name.toLowerCase().includes(filterString)
    );
    if (filteredList.length >= 10) {
      setShowWarning(true);
      return;
    }
    setFilteredCountries(filteredList);
    setShowWarning(false);
  };

  return (
    <div className="App">
      <Filter
        label={filterLbl}
        inputValue={filter}
        onChangeHandler={handleFilterChange}
      />
      {/* {showWarning ? (
        <p>{tooManyMatchesWarning}</p>
      ) : (
        filteredCountries.map((country) => (
          <p key={country.name}>{country.name}</p>
        ))
      )} */}

      {showWarning && <p>{tooManyMatchesWarning}</p>}
      {!showWarning &&
        filteredCountries.map((country) => (
          <p key={country.name}>{country.name}</p>
        ))}
    </div>
  );
}

export default App;
