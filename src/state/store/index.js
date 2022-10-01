import { configureStore, applyMiddleware, compose } from '@reduxjs/toolkit';
import reducer from '../reducer/combinedReducer';
import thunk from 'redux-thunk';

const store = configureStore({

  reducer: reducer,

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;