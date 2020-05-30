import React, { useState } from 'react';

import PersonDetails from './components/PersonDetails';
import Input from './components/Input';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const handleNewNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumberChange = (event) => {
    setNewNumber(event.target.value);
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
    setPersons(persons.concat(newPerson));
    setNewName('');
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
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <PersonDetails key={person.name} person={person} />
      ))}
    </div>
  );
};

export default App;
