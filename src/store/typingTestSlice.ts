import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface TypingTestState {
  // Test state
  isTestStarted: boolean;
  isTestCompleted: boolean;
  isTimeUp: boolean;

  // Typing state
  userInput: string;
  currentIndex: number;
  startTime: number | null;
  endTime: number | null;
  errors: number[]; // Serialized as array but converted to Set in hook
  timeRemaining: number;

  // Timer
  timerId: number | null;

  // Configuration
  targetText: string;
  timeLimitInSeconds: number;

  // Callback tracking
  hasCalledOnComplete: boolean;
}

const initialState: TypingTestState = {
  isTestStarted: false,
  isTestCompleted: false,
  isTimeUp: false,
  userInput: '',
  currentIndex: 0,
  startTime: null,
  endTime: null,
  errors: [],
  timeRemaining: 0,
  timerId: null,
  targetText: '',
  timeLimitInSeconds: 0,
  hasCalledOnComplete: false,
};

const typingTestSlice = createSlice({
  name: 'typingTest',
  initialState,
  reducers: {
    setTargetText: (state, action: PayloadAction<string>) => {
      state.targetText = action.payload;
    },
    setTimeLimitInSeconds: (state, action: PayloadAction<number>) => {
      state.timeLimitInSeconds = action.payload;
      state.timeRemaining = action.payload;
    },
    startTest: (state) => {
      state.isTestStarted = true;
      state.startTime = Date.now();
      state.userInput = '';
      state.currentIndex = 0;
      state.errors = [];
      state.isTestCompleted = false;
      state.isTimeUp = false;
      state.endTime = null;
      state.timeRemaining = state.timeLimitInSeconds;
      state.hasCalledOnComplete = false;
    },
    completeTest: (state) => {
      state.isTestCompleted = true;
      state.endTime = Date.now();
      if (state.timerId) {
        clearInterval(state.timerId);
        state.timerId = null;
      }
    },
    markCallbackCalled: (state) => {
      state.hasCalledOnComplete = true;
    },
    resetTest: (state) => {
      if (state.timerId) {
        clearInterval(state.timerId);
        state.timerId = null;
      }
      state.isTestStarted = false;
      state.isTestCompleted = false;
      state.isTimeUp = false;
      state.userInput = '';
      state.currentIndex = 0;
      state.startTime = null;
      state.endTime = null;
      state.errors = [];
      state.timeRemaining = state.timeLimitInSeconds;
      state.hasCalledOnComplete = false;
    },
    updateUserInput: (
      state,
      action: PayloadAction<{ value: string; errors: number[] }>,
    ) => {
      state.userInput = action.payload.value;
      state.currentIndex = action.payload.value.length;
      state.errors = action.payload.errors;
    },
    setTimerId: (state, action: PayloadAction<number | null>) => {
      state.timerId = action.payload;
    },
    decrementTimeRemaining: (state) => {
      if (state.timeRemaining > 0) {
        state.timeRemaining -= 1;
        if (state.timeRemaining <= 0) {
          state.isTimeUp = true;
          state.isTestCompleted = true;
          state.endTime = Date.now();
          if (state.timerId) {
            clearInterval(state.timerId);
            state.timerId = null;
          }
        }
      }
    },
    setTimeUp: (state) => {
      state.isTimeUp = true;
    },
  },
});

export const {
  setTargetText,
  setTimeLimitInSeconds,
  startTest,
  completeTest,
  markCallbackCalled,
  resetTest,
  updateUserInput,
  setTimerId,
  decrementTimeRemaining,
  setTimeUp,
} = typingTestSlice.actions;

export default typingTestSlice.reducer;
