import React from 'react';

const Languages = ({ languages }) => (
  <>
    <h2>Spoken Languages</h2>
    <ul>
      {languages.map((lang) => (
        <li key={lang.name}>{lang.name}</li>
      ))}
    </ul>
  </>
);

export default Languages;
