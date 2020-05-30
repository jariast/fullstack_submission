import React from 'react';

const Filter = ({ label, inputValue, onChangeHandler }) => (
  <label>
    {label}
    <input value={inputValue} onChange={onChangeHandler} />
  </label>
);

export default Filter;
