import React, { useState, useEffect } from 'react';

import './App.css';

import PersonDetails from './components/PersonDetails';
import Input from './components/Input';
import Filter from './components/Filter';
import Notification from './components/Notification';
import personsService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [notification, setNotification] = useState({});
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

  const handlePersonDeleteClick = (person) => {
    console.log('Deleting person :', person);
    if (window.confirm(`Do you really want to delete "${person.name}" info?`)) {
      personsService
        .deletePerson(person.id)
        .then(() => {
          const newPersonsState = persons.filter((p) => p.id !== person.id);
          setPersons(newPersonsState);
          setFilteredPersons(newPersonsState);
          showNotification(false, `"${person.name}" has been deleted`);
        })
        .catch((error) => {
          showNotification(
            true,
            `${person.name} no longer exists in the server.`
          );
        });
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const isDuplicateEntry = persons.some((person) => person.name === newName);
    if (isDuplicateEntry) {
      const shouldUpdateEntry = window.confirm(
        `"${newName}" already exists, do you want to update the phone number?`
      );
      if (shouldUpdateEntry) {
        updatePerson(newName);
      }
    } else {
      createPerson();
    }
  };

  const createPerson = () => {
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    personsService
      .createPerson(newPerson)
      .then((newPerson) => {
        const newPersonsObj = persons.concat(newPerson);
        showNotification(false, `"${newPerson.name}" has been created`);
        resetAppState(newPersonsObj);
      })
      .catch((error) => showNotification(true, error.response.data.error));
  };

  const updatePerson = (newName) => {
    const person = persons.find((person) => person.name === newName);
    const changedPerson = { ...person, number: newNumber };

    personsService
      .updatePerson(person.id, changedPerson)
      .then((modifiedPerson) => {
        const newPersonsState = persons.map((p) =>
          p.id !== person.id ? p : modifiedPerson
        );
        showNotification(
          false,
          `"${modifiedPerson.name}" number has been updated.`
        );
        resetAppState(newPersonsState);
      })
      .catch((error) => {
        showNotification(true, error.response.data.error);
      });
  };

  const resetAppState = (newPersonsState) => {
    setPersons(newPersonsState);
    setFilteredPersons(newPersonsState);
    setNewName('');
    setNewNumber('');
    setNewFilter('');
  };

  const showNotification = (isError, message) => {
    setNotification({ isError, message });
    setTimeout(() => {
      setNotification({});
    }, 5000);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <form onSubmit={handleFormSubmit}>
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
        <PersonDetails
          key={person.id}
          person={person}
          clickHandler={() => handlePersonDeleteClick(person)}
        />
      ))}
    </div>
  );
};

export default App;
