import { configureStore } from '@reduxjs/toolkit';
import { api } from './api';
import highScoreReducer from './highScoreSlice';
import configurationReducer from './configurationSlice';
import typingTestReducer from './typingTestSlice';
import { highScoreListenerMiddleware } from './highScoreMiddleware';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    highScore: highScoreReducer,
    configuration: configurationReducer,
    typingTest: typingTestReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(api.middleware)
      .prepend(highScoreListenerMiddleware.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
