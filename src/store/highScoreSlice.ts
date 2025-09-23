import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HighScoreState {
  value: number | null;
}

const loadHighScore = (): number | null => {
  try {
    const highScore = localStorage.getItem('highScore');
    if (!highScore) {
      return null;
    }
    return JSON.parse(highScore);
  } catch (error) {
    console.error('Error loading highscore from localStorage', error);
    return null;
  }
};


const initialState: HighScoreState = {
  value: loadHighScore(),
};

export const highScoreSlice = createSlice({
  name: 'highScore',
  initialState,
  reducers: {
    setHighScore: (state, action: PayloadAction<number>) => {
      const newScore = action.payload;
      if (state.value === null || newScore > state.value) {
        state.value = newScore;
      }
    },
  },
});

export const { setHighScore } = highScoreSlice.actions;

export default highScoreSlice.reducer;
