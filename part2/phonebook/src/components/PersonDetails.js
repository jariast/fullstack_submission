import React from 'react';

const PersonDetails = ({ person, clickHandler }) => (
  <div className="personDetails">
    <p>{`${person.name} /// ${person.number}`}</p>
    <button onClick={clickHandler}>Delete Person</button>
  </div>
);

export default PersonDetails;
