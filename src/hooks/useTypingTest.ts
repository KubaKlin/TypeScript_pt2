import { useState } from 'react';
import {
  calculateErrors,
  calculateTypingStats,
} from '../utils/typingCalculations';

export const useTypingTest = (
  targetText: string,
  timeLimitInSeconds: number = 0,
  onTestComplete?: (wordsPerMinute: number) => void,
) => {
  // Test state
  const [isTestStarted, setIsTestStarted] = useState<boolean>(false);
  const [isTestCompleted, setIsTestCompleted] = useState<boolean>(false);
  const [isTimeUp, setIsTimeUp] = useState<boolean>(false);

  // Typing state
  const [userInput, setUserInput] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [errors, setErrors] = useState<Set<number>>(new Set());
  const [timeRemaining, setTimeRemaining] =
    useState<number>(timeLimitInSeconds);

  // Timer
  const [timerId, setTimerId] = useState<number | null>(null);

  const completeTest = () => {
    const finalEndTime = Date.now();
    setIsTestCompleted(true);
    setEndTime(finalEndTime);
    if (timerId) {
      clearInterval(timerId);
      setTimerId(null);
    }

    // Calculate final stats and pass WPM to callback
    if (onTestComplete && startTime) {
      const finalStats = calculateTypingStats(
        startTime,
        finalEndTime,
        userInput,
        errors,
      );
      onTestComplete(finalStats.wordsPerMinute);
    }
  };

  const startTest = () => {
    setIsTestStarted(true);
    setStartTime(Date.now());
    setUserInput('');
    setCurrentIndex(0);
    setErrors(new Set());
    setIsTestCompleted(false);
    setIsTimeUp(false);
    setEndTime(null);
    setTimeRemaining(timeLimitInSeconds);

    // Start timer if time limit is set
    if (timeLimitInSeconds > 0) {
      const id = setInterval(() => {
        setTimeRemaining((previous) => {
          if (previous <= 1) {
            setIsTimeUp(true);
            completeTest();
            return 0;
          }
          return previous - 1;
        });
      }, 1000);
      setTimerId(id);
    }
  };

  const resetTest = () => {
    if (timerId) {
      clearInterval(timerId);
      setTimerId(null);
    }
    setIsTestStarted(false);
    setIsTestCompleted(false);
    setIsTimeUp(false);
    setUserInput('');
    setCurrentIndex(0);
    setStartTime(null);
    setEndTime(null);
    setErrors(new Set());
    setTimeRemaining(timeLimitInSeconds);
  };

  const handleInputChange = (value: string) => {
    setUserInput(value);
    setCurrentIndex(value.length);

    const newErrors = calculateErrors(value, targetText);
    setErrors(newErrors);

    // Check if test is completed
    if (value.length >= targetText.length) {
      completeTest();
    }
  };

  return {
    isTestStarted,
    isTestCompleted,
    isTimeUp,
    userInput,
    currentIndex,
    startTime,
    endTime,
    errors,
    timeRemaining,

    startTest,
    resetTest,
    handleInputChange,
  };
};
