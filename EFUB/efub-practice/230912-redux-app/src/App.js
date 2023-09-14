import React from 'react';
import { createStore } from 'redux';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './store';
import counterSlice from './counterSlice';
import { asyncUpFetch } from './counterSlice';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

let persistor = persistStore(store);

function Counter() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.value);
  const status = useSelector((state) => {
    return state.counter.status;
  });
  return (
    <div>
      <button
        onClick={() => {
          dispatch(counterSlice.actions.up(2));
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          dispatch(asyncUpFetch());
        }}
      >
        + async fetch
      </button>
      <div>
        {count} | {status}
      </div>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Counter></Counter>
      </PersistGate>
    </Provider>
  );
}

export default App;
