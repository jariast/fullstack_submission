import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './app.css';

import Filter from './components/Filter';
import CountryDetails from './components/CountryDetails';
import CountryItem from './components/CountryItem';

function App() {
  const filterLbl = 'Find countries by name';
  const tooManyMatchesWarning = 'Too many matches, please narrow your filter.';
  const loadingInfoWarning = 'Loading country data, please wait.';
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [contentHtml, setContentHtml] = useState();

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then((response) => setCountries(response.data));
  };
  useEffect(hook, []);

  const selectredCountryHook = () => {
    if (!selectedCountry) {
      return;
    }
    axios
      .get('http://api.weatherstack.com/current', {
        params: {
          access_key: process.env.REACT_APP_API_KEY,
          query: selectedCountry.name,
        },
      })
      .then((response) => {
        selectedCountry.weatherData = response.data.current;
        setContentHtml(<CountryDetails country={selectedCountry} />);
      });
  };
  useEffect(selectredCountryHook, [selectedCountry]);

  const handleShowCountryDetailClick = (country) => {
    setSelectedCountry(country);
    setContentHtml(<p>{loadingInfoWarning}</p>);
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
      setSelectedCountry(filteredList[0]);
      setContentHtml(<p>{loadingInfoWarning}</p>);
    } else {
      setContentHtml('');
    }
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
