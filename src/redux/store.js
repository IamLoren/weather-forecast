import { configureStore } from "@reduxjs/toolkit";
import {tripReducer} from './tripSlice.js';

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist';
  import storage from 'redux-persist/lib/storage';
  
  const persistConfig = {
    key: 'trip',
    version: 1,
    storage,
    whitelist: ['listOfTrips', 'selectedCity', 'weatherInSelectedCity', 'todayInSelectedCity', 'startDateInSelectedCity'],
  };

  const persistedReducer = persistReducer(persistConfig, tripReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    devTools: process.env.NODE_ENV !== 'production',
})
export let persistor = persistStore(store)