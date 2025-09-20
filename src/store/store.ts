import { configureStore } from '@reduxjs/toolkit';
import { api } from './api';
import highScoreReducer from './highScoreSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    highScore: highScoreReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(api.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
