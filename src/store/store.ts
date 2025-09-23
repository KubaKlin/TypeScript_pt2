import { configureStore } from '@reduxjs/toolkit';
import { api } from './api';
import highScoreReducer from './highScoreSlice';
import configurationReducer from './configurationSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    highScore: highScoreReducer,
    configuration: configurationReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(api.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
