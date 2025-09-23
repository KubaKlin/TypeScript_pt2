import { useState } from 'react';
import { TextType } from '../types';

export const useConfiguration = () => {
  const [textType, setTextType] = useState<TextType>('sentences');
  const [textAmount, setTextAmount] = useState<number>(2);
  const [timeLimitInSeconds, setTimeLimit] = useState<number>(60); // in seconds

  const handleTextTypeChange = (type: TextType) => {
    setTextType(type);
  };

  const handleTextAmountChange = (amount: number) => {
    setTextAmount(amount);
  };

  const handleTimeLimitChange = (time: number) => {
    setTimeLimit(time);
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
