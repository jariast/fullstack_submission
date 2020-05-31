import React, { useState, useEffect } from 'react';
import axios from 'axios';

import PersonDetails from './components/PersonDetails';
import Input from './components/Input';
import Filter from './components/Filter';
import personsService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [filteredPersons, setFilteredPersons] = useState(persons);

  const hook = () => {
    personsService.getAllPersons().then((persons) => {
      setPersons(persons);
      setFilteredPersons(persons);
    });
  };

  useEffect(hook, []);

  const handleNewNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleNewFilterChange = (event) => {
    const filterString = event.target.value;
    setNewFilter(filterString);
    setFilteredPersons(
      persons.filter((person) =>
        person.name.toLowerCase().includes(filterString)
      )
    );
  };

  const addNewPerson = (event) => {
    event.preventDefault();
    const isDuplicateEntry = persons.some((person) => person.name === newName);
    if (isDuplicateEntry) {
      alert(`"${newName}" already exists, please use another name.`);
      return;
    }
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    personsService.createPerson(newPerson).then((newPerson) => {
      const newPersonsObj = persons.concat(newPerson);
      setPersons(newPersonsObj);
      setNewName('');
      setNewNumber('');
      setFilteredPersons(newPersonsObj);
      setNewFilter('');
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewPerson}>
        <div>
          <Input
            label="name"
            inputValue={newName}
            onChangeHandler={handleNewNameChange}
          />
          <Input
            label="number"
            inputValue={newNumber}
            onChangeHandler={handleNewNumberChange}
          />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Filter
        label="Filter"
        inputValue={newFilter}
        onChangeHandler={handleNewFilterChange}
      />
      {filteredPersons.map((person) => (
        <PersonDetails key={person.name} person={person} />
      ))}
    </div>
  );
};

export default App;
