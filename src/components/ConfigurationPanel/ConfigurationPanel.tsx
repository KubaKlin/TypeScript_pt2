import { TextType } from '../../types';
import type { ChangeEvent } from 'react';
import { StyledPanelHeader, StyledPanelWrapper, StyledOptionsWrapper, StyledSelect, StyledInput, StyledButton } from './ConfigurationPanel.styles';

interface ConfigurationPanelProps {
  textType: TextType;
  textAmount: number;
  onTextTypeChange: (type: TextType) => void;
  onTextAmountChange: (amount: number) => void;
  handleNewText: () => void;
}

export const ConfigurationPanel = ({
  textType,
  textAmount,
  onTextTypeChange,
  onTextAmountChange,
  handleNewText,
}: ConfigurationPanelProps) => {
  const handleTextAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    onTextAmountChange(Number(event.target.value));
  };

  const handleTextTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onTextTypeChange(event.target.value as TextType);
  };

  return (
    <StyledPanelWrapper>
      <StyledPanelHeader>
        Configure Your Test
      </StyledPanelHeader>
      <StyledOptionsWrapper>
        <div>
          <label>Text Type: </label>
          <StyledSelect
            value={textType}
            onChange={handleTextTypeChange}
          >
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

        <StyledButton onClick={handleNewText}>
          Get New Text
        </StyledButton>
      </StyledOptionsWrapper>
    </StyledPanelWrapper>
  );
};