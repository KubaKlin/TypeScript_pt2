import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { setHighScore } from './highScoreSlice';

const saveHighScoreToLocalStorage = (score: number): void => {
  try {
    localStorage.setItem('highScore', JSON.stringify(score));
  } catch (error) {
    console.error('Error saving highscore to localStorage', error);
  }
};

export const highScoreListenerMiddleware = createListenerMiddleware();

// Listen for high score changes
highScoreListenerMiddleware.startListening({
  matcher: isAnyOf(setHighScore),
  effect: (_, listenerApi) => {
    const state = listenerApi.getState() as any;
    const currentHighScore = state.highScore.value;
    
    if (currentHighScore !== null) {
      saveHighScoreToLocalStorage(currentHighScore);
    }
  },
});
