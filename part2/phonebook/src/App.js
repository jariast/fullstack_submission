import React, { useState } from 'react';

import PersonDetails from './components/PersonDetails';
import Input from './components/Input';
import Filter from './components/Filter';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [filteredPersons, setFilteredPersons] = useState(persons);

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
    const newPersonsObj = persons.concat(newPerson);
    setPersons(newPersonsObj);
    setNewName('');
    setNewNumber('');
    setFilteredPersons(newPersonsObj);
    setNewFilter('');
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
