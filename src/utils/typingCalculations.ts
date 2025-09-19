import { TypingStats } from '../types';

export const calculateTypingStats = (
  startTime: number | null,
  endTime: number | null,
  userInput: string,
  errors: Set<number>,
): TypingStats => {
  if (!startTime) {
    return {
      wordsPerMinute: 0,
      accuracy: 0,
      timeElapsed: 0,
      totalCharacters: 0,
      correctCharacters: 0,
    };
  }

  const timeElapsed = ((endTime || Date.now()) - startTime) / 1000 / 60; // in minutes
  const totalCharacters = userInput.length;
  const correctCharacters = totalCharacters - errors.size;
  const accuracy =
    totalCharacters > 0 ? (correctCharacters / totalCharacters) * 100 : 0;
  const wordsTyped = userInput.trim().split(/\s+/).length;
  const wordsPerMinute = Math.round(wordsTyped / timeElapsed);

  return {
    wordsPerMinute,
    accuracy: Math.round(accuracy * 100) / 100,
    timeElapsed: Math.round(timeElapsed * 60 * 100) / 100,
    totalCharacters,
    correctCharacters,
  };
};

export const calculateErrors = (
  userInput: string,
  targetText: string,
): Set<number> => {
  return userInput.split('').reduce((errors, characters, index) => {
    if (index < targetText.length && characters !== targetText[index]) {
      errors.add(index);
    }
    return errors;
  }, new Set<number>());
};
