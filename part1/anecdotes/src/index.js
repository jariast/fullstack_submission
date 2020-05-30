import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ buttonLabel, clickHandler }) => (
  <button onClick={clickHandler}>{buttonLabel}</button>
);

const App = (props) => {
  const buttonLabel = 'Click me for inspirational quotes!!!';
  const [selected, setSelected] = useState(0);

  const randomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const generateDifferentRandomInt = (min, max) => {
    const random = randomInt(min, max);
    if (random === selected) {
      return generateDifferentRandomInt(min, max);
    }
    return random;
  };

  const handleClick = () => {
    setSelected(generateDifferentRandomInt(0, props.anecdotes.length));
  };

  return (
    <>
      <h1>Anecdotes</h1>
      <p>{props.anecdotes[selected]}</p>
      <Button clickHandler={handleClick} buttonLabel={buttonLabel} />
    </>
  );
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
