import { combineReducers, configureStore } from '@reduxjs/toolkit';
import counterSlice from './counterSlice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const reducers = combineReducers({
  counter: counterSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['counter'],
  // blacklist: []
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
