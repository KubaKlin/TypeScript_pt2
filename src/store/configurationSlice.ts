import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { TextType } from '../types';

interface ConfigurationState {
  textType: TextType;
  textAmount: number;
  timeLimitInSeconds: number;
}

const initialState: ConfigurationState = {
  textType: 'sentences',
  textAmount: 2,
  timeLimitInSeconds: 60,
};

const configurationSlice = createSlice({
  name: 'configuration',
  initialState,
  reducers: {
    setTextType: (state, action: PayloadAction<TextType>) => {
      state.textType = action.payload;
    },
    setTextAmount: (state, action: PayloadAction<number>) => {
      state.textAmount = action.payload;
    },
    setTimeLimitInSeconds: (state, action: PayloadAction<number>) => {
      state.timeLimitInSeconds = action.payload;
    },
  },
});

export const { setTextType, setTextAmount, setTimeLimitInSeconds } =
  configurationSlice.actions;
export default configurationSlice.reducer;
