import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import {
  setTargetText,
  setTimeLimitInSeconds,
  startTest as startTestAction,
  completeTest,
  markCallbackCalled,
  resetTest as resetTestAction,
  updateUserInput,
  setTimerId,
  decrementTimeRemaining,
} from '../store/typingTestSlice';
import {
  calculateErrors,
  calculateTypingStats,
} from '../utils/typingCalculations';

export const useTypingTest = (
  targetText: string,
  timeLimitInSeconds: number = 0,
  onTestComplete?: (wordsPerMinute: number) => void,
) => {
  const dispatch = useDispatch();
  const typingTestState = useSelector((state: RootState) => state.typingTest);

  const handleCompleteTest = () => {
    dispatch(completeTest());

    if (onTestComplete && typingTestState.startTime) {
      const finalEndTime = Date.now();
      const errorsSet = new Set(typingTestState.errors);
      const finalStats = calculateTypingStats(
        typingTestState.startTime,
        finalEndTime,
        typingTestState.userInput,
        errorsSet,
      );
      onTestComplete(finalStats.wordsPerMinute);
    }
  };

  // Check if test was just completed due to time up and trigger callback
  if (
    typingTestState.isTimeUp &&
    typingTestState.isTestCompleted &&
    onTestComplete &&
    typingTestState.startTime &&
    typingTestState.endTime &&
    !typingTestState.hasCalledOnComplete
  ) {
    const errorsSet = new Set(typingTestState.errors);
    const finalStats = calculateTypingStats(
      typingTestState.startTime,
      typingTestState.endTime,
      typingTestState.userInput,
      errorsSet,
    );
    onTestComplete(finalStats.wordsPerMinute);
    dispatch(markCallbackCalled());
  }

  const initializeTest = () => {
    if (typingTestState.targetText !== targetText) {
      dispatch(setTargetText(targetText));
    }
    if (typingTestState.timeLimitInSeconds !== timeLimitInSeconds) {
      dispatch(setTimeLimitInSeconds(timeLimitInSeconds));
    }
  };

  const startTest = () => {
    // Initialize test configuration before starting
    initializeTest();
    dispatch(startTestAction());

    if (timeLimitInSeconds > 0) {
      const id = setInterval(() => {
        dispatch(decrementTimeRemaining());
      }, 1000);
      dispatch(setTimerId(id));
    }
  };

  const resetTest = () => {
    dispatch(resetTestAction());
  };

  const handleInputChange = (value: string) => {
    const newErrors = calculateErrors(value, targetText);
    const errorsArray = Array.from(newErrors);

    dispatch(updateUserInput({ value, errors: errorsArray }));

    // Check if test is completed
    if (value.length >= targetText.length) {
      handleCompleteTest();
    }
  };

  return {
    isTestStarted: typingTestState.isTestStarted,
    isTestCompleted: typingTestState.isTestCompleted,
    isTimeUp: typingTestState.isTimeUp,
    userInput: typingTestState.userInput,
    currentIndex: typingTestState.currentIndex,
    startTime: typingTestState.startTime,
    endTime: typingTestState.endTime,
    errors: new Set(typingTestState.errors), // Convert back to Set for compatibility
    timeRemaining: typingTestState.timeRemaining,

    initializeTest,
    startTest,
    resetTest,
    handleInputChange,
  };
};
