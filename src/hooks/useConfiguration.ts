import { useSelector, useDispatch } from 'react-redux';
import { TextType } from '../types';
import { RootState } from '../store/store';
import {
  setTextType,
  setTextAmount,
  setTimeLimitInSeconds,
} from '../store/configurationSlice';

export const useConfiguration = () => {
  const dispatch = useDispatch();
  const { textType, textAmount, timeLimitInSeconds } = useSelector(
    (state: RootState) => state.configuration,
  );

  const handleTextTypeChange = (type: TextType) => {
    dispatch(setTextType(type));
  };

  const handleTextAmountChange = (amount: number) => {
    dispatch(setTextAmount(amount));
  };

  const handleTimeLimitChange = (time: number) => {
    dispatch(setTimeLimitInSeconds(time));
  };

  return {
    textType,
    textAmount,
    timeLimitInSeconds,
    handleTextTypeChange,
    handleTextAmountChange,
    handleTimeLimitChange,
  };
};
