import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setHighScore } from '../store/highScoreSlice';
import type { RootState } from '../store/store';

interface UseHighScoreProps {
  isTestCompleted: boolean;
  wordsPerMinute: number;
}

export const useHighScore = ({
  isTestCompleted,
  wordsPerMinute,
}: UseHighScoreProps) => {
  const dispatch = useDispatch();
  const highScore = useSelector((state: RootState) => state.highScore.value);

  // Check for high score when test completes
  useEffect(() => {
    const checkForHighScore = (wordsPerMinute: number): void => {
      if (highScore === null || wordsPerMinute > highScore) {
        dispatch(setHighScore(wordsPerMinute));
      }
    };

    if (isTestCompleted) {
      checkForHighScore(wordsPerMinute);
    }
  }, [isTestCompleted, wordsPerMinute, highScore, dispatch]);

  return {
    highScore,
  };
};
