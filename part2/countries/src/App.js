import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './app.css';

import Filter from './components/Filter';
import CountryDetails from './components/CountryDetails';
import CountryItem from './components/CountryItem';

function App() {
  const filterLbl = 'Find countries by name';
  const tooManyMatchesWarning = 'Too many matches, please narrow your filter.';
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [filter, setFilter] = useState('');
  const [contentHtml, setContentHtml] = useState();

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then((response) => setCountries(response.data));
  };
  useEffect(hook, []);

  const handleShowCountryDetailClick = (country) => {
    setContentHtml(<CountryDetails country={country} />);
  };

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
      setContentHtml(<p>{tooManyMatchesWarning}</p>);
      return;
    } else if (filteredList.length > 1) {
      setContentHtml(
        filteredList.map((country) => (
          <CountryItem
            key={country.name}
            country={country}
            clickHandler={() => handleShowCountryDetailClick(country)}
          />
        ))
      );
    } else if (filteredList.length === 1) {
      setContentHtml(<CountryDetails country={filteredList[0]} />);
    } else {
      setContentHtml('');
    }
    setFilteredCountries(filteredList);
  };

  return (
    <div className="App">
      <Filter
        label={filterLbl}
        inputValue={filter}
        onChangeHandler={handleFilterChange}
      />
      {contentHtml}
    </div>
  );
}

export default App;
