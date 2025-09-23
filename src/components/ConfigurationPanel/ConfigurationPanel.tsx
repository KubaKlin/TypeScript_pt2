import { TextType } from '../../types';
import type { ChangeEvent } from 'react';
import { useConfiguration } from '../../hooks/useConfiguration';
import {
  StyledPanelHeader,
  StyledPanelWrapper,
  StyledOptionsWrapper,
  StyledSelect,
  StyledInput,
  StyledButton,
} from './ConfigurationPanel.styles';

interface ConfigurationPanelProps {
  handleNewText: () => void;
  onConfigChange?: () => void;
}

export const ConfigurationPanel = ({
  handleNewText,
  onConfigChange,
}: ConfigurationPanelProps) => {
  const {
    textType,
    textAmount,
    timeLimitInSeconds,
    handleTextTypeChange,
    handleTextAmountChange,
    handleTimeLimitChange,
  } = useConfiguration();
  const handleTextAmountChangeEvent = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    handleTextAmountChange(Number(event.target.value));
    onConfigChange?.();
  };

  const handleTextTypeChangeEvent = (event: ChangeEvent<HTMLSelectElement>) => {
    handleTextTypeChange(event.target.value as TextType);
    onConfigChange?.();
  };

  const handleTimeLimitChangeEvent = (
    event: ChangeEvent<HTMLSelectElement>,
  ) => {
    handleTimeLimitChange(Number(event.target.value));
    onConfigChange?.();
  };

  return (
    <StyledPanelWrapper>
      <StyledPanelHeader>Configure Your Test</StyledPanelHeader>
      <StyledOptionsWrapper>
        <div>
          <label>Text Type: </label>
          <StyledSelect value={textType} onChange={handleTextTypeChangeEvent}>
            <option value="paragraphs">Paragraphs</option>
            <option value="sentences">Sentences</option>
          </StyledSelect>
        </div>

        <div>
          <label>Number of {textType}: </label>
          <StyledInput
            type="number"
            value={textAmount}
            onChange={handleTextAmountChangeEvent}
            min="1"
            max={textType === 'paragraphs' ? 10 : 20}
          />
        </div>

        <div>
          <label>Time Limit: </label>
          <StyledSelect
            value={timeLimitInSeconds}
            onChange={handleTimeLimitChangeEvent}
          >
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
