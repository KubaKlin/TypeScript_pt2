import { useState } from 'react';
import { TextType } from '../types';

export const useConfiguration = () => {
  const [textType, setTextType] = useState<TextType>('sentences');
  const [textAmount, setTextAmount] = useState<number>(2);

  const handleTextTypeChange = (type: TextType) => {
    setTextType(type);
  };

  const handleTextAmountChange = (amount: number) => {
    setTextAmount(amount);
  };

  return {
    textType,
    textAmount,
    handleTextTypeChange,
    handleTextAmountChange,
  };
};
