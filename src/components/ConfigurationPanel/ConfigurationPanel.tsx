import { TextType } from '../../types';
import type { ChangeEvent } from 'react';
import {
  StyledPanelHeader,
  StyledPanelWrapper,
  StyledOptionsWrapper,
  StyledSelect,
  StyledInput,
  StyledButton,
} from './ConfigurationPanel.styles';

interface ConfigurationPanelProps {
  textType: TextType;
  textAmount: number;
  timeLimitInSeconds: number;
  onTextTypeChange: (type: TextType) => void;
  onTextAmountChange: (amount: number) => void;
  onTimeLimitChange: (time: number) => void;
  handleNewText: () => void;
}

export const ConfigurationPanel = ({
  textType,
  textAmount,
  timeLimitInSeconds,
  onTextTypeChange,
  onTextAmountChange,
  onTimeLimitChange,
  handleNewText,
}: ConfigurationPanelProps) => {
  const handleTextAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    onTextAmountChange(Number(event.target.value));
  };

  const handleTextTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onTextTypeChange(event.target.value as TextType);
  };

  const handleTimeLimitChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onTimeLimitChange(Number(event.target.value));
  };

  return (
    <StyledPanelWrapper>
      <StyledPanelHeader>Configure Your Test</StyledPanelHeader>
      <StyledOptionsWrapper>
        <div>
          <label>Text Type: </label>
          <StyledSelect value={textType} onChange={handleTextTypeChange}>
            <option value="paragraphs">Paragraphs</option>
            <option value="sentences">Sentences</option>
          </StyledSelect>
        </div>

        <div>
          <label>Number of {textType}: </label>
          <StyledInput
            type="number"
            value={textAmount}
            onChange={handleTextAmountChange}
            min="1"
            max={textType === 'paragraphs' ? 10 : 20}
          />
        </div>

        <div>
          <label>Time Limit: </label>
          <StyledSelect value={timeLimitInSeconds} onChange={handleTimeLimitChange}>
            <option value={30}>30 seconds</option>
            <option value={60}>1 minute</option>
            <option value={120}>2 minutes</option>
            <option value={0}>No limit</option>
          </StyledSelect>
        </div>

        <StyledButton onClick={handleNewText}>Get New Text</StyledButton>
      </StyledOptionsWrapper>
    </StyledPanelWrapper>
  );
};
