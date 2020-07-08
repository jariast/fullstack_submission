import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { vote } from '../reducers/anecdoteReducer';
import { setMessage, clearMsg } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector((state) =>
    state.anecdotes.sort((a, b) => b.votes - a.votes)
  );
  const dispatch = useDispatch();

  // TODO Compare this implementation with the solution after submitting the code
  const handleVoteClick = (anecdote) => {
    dispatch(vote(anecdote.id));
    dispatch(setMessage(`You voted for "${anecdote.content}"`));
    setTimeout(() => {
      dispatch(clearMsg());
    }, 5000);
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVoteClick(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
