import { useSelector, useDispatch } from 'react-redux';
import { setHighScore } from '../store/highScoreSlice';
import type { RootState } from '../store/store';

export const useHighScore = () => {
  const dispatch = useDispatch();
  const highScore = useSelector((state: RootState) => state.highScore.value);

  const checkForHighScore = (wordsPerMinute: number): void => {
    if (highScore === null || wordsPerMinute > highScore) {
      dispatch(setHighScore(wordsPerMinute));
    }
  };

  return {
    highScore,
    checkForHighScore,
  };
};
