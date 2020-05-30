import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ buttonLabel, clickHandler }) => (
  <button onClick={clickHandler}>{buttonLabel}</button>
);

const Votes = ({ votes }) => <h3>{`This anecdote has ${votes} votes.`}</h3>;

const App = ({ anecdotes }) => {
  const mainHeader = 'Anecdote of the day';
  const mostVotedAnecdote = 'Most voted anecdote';
  const randomAnecdoteBtnLabel = 'Click me for inspirational quotes!!!';
  const voteBtnLabel = 'Vote!';
  const [selected, setSelected] = useState(0);
  const [mostVotesIndex, setMostVotedIndex] = useState(0);
  const [votes, setVote] = useState(Array(anecdotes.length).fill(0));

  useEffect(() => {
    findMostVoted();
  });

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

  const handleRandomBtnClick = () => {
    setSelected(generateDifferentRandomInt(0, anecdotes.length));
  };

  const handleVoteBtnClick = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVote(copy);
  };

  const findMostVoted = () => {
    const mostVotes = Math.max(...votes);
    const mostVotedIndex = votes.findIndex((e) => e >= mostVotes);
    setMostVotedIndex(mostVotedIndex);
  };

  return (
    <>
      <h1>{mainHeader}</h1>
      <p>{anecdotes[selected]}</p>
      <Button
        clickHandler={handleRandomBtnClick}
        buttonLabel={randomAnecdoteBtnLabel}
      />
      <Button clickHandler={handleVoteBtnClick} buttonLabel={voteBtnLabel} />
      <Votes votes={votes[selected]} />
      <h1>{mostVotedAnecdote}</h1>
      <p>{anecdotes[mostVotesIndex]}</p>
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
