import { createStore } from 'redux';
import reducer from './reducers/anecdoteReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

export default function configureStore() {
  const store = createStore(reducer, composeWithDevTools());
  return store;
}
