import { useState } from 'react';
import { calculateErrors } from '../utils/typingCalculations';

export const useTypingTest = (targetText: string) => {
  // Test state
  const [isTestStarted, setIsTestStarted] = useState<boolean>(false);
  const [isTestCompleted, setIsTestCompleted] = useState<boolean>(false);

  // Typing state
  const [userInput, setUserInput] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [errors, setErrors] = useState<Set<number>>(new Set());

  const startTest = () => {
    setIsTestStarted(true);
    setStartTime(Date.now());
    setUserInput('');
    setCurrentIndex(0);
    setErrors(new Set());
    setIsTestCompleted(false);
    setEndTime(null);
  };

  const resetTest = () => {
    setIsTestStarted(false);
    setIsTestCompleted(false);
    setUserInput('');
    setCurrentIndex(0);
    setStartTime(null);
    setEndTime(null);
    setErrors(new Set());
  };

  const handleInputChange = (value: string) => {
    setUserInput(value);
    setCurrentIndex(value.length);

    const newErrors = calculateErrors(value, targetText);
    setErrors(newErrors);

    // Check if test is completed
    if (value.length >= targetText.length) {
      setIsTestCompleted(true);
      setEndTime(Date.now());
    }
  };

  return {
    isTestStarted,
    isTestCompleted,
    userInput,
    currentIndex,
    startTime,
    endTime,
    errors,

    startTest,
    resetTest,
    handleInputChange,
  };
};
