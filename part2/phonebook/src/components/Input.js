import React from 'react';

const Input = ({ label, inputValue, onChangeHandler }) => (
  <label>
    {label}
    <input required value={inputValue} onChange={onChangeHandler} />
  </label>
);

export default Input;
