import type { ChangeEvent } from 'react';
import { StyledTextWrapper, StyledButtonWrapper, StyledButton, StyledTextArea } from './TypingInput.styles';

interface TypingInputProps {
  isTestStarted: boolean;
  isTestCompleted: boolean;
  userInput: string;
  onInputChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onStartTest: () => void;
}

export const TypingInput = ({
  isTestStarted,
  isTestCompleted,
  userInput,
  onInputChange,
  onStartTest,
}: TypingInputProps) => {

  if (isTestCompleted) return null;

  if (!isTestStarted) return (
    <StyledButtonWrapper>
      <StyledButton onClick={onStartTest}>
        Start Typing Test
      </StyledButton>
    </StyledButtonWrapper>
  )

  return (
    <StyledTextWrapper>
      <div>
        <h3>Type here:</h3>
        <StyledTextArea
          value={userInput}
          onChange={onInputChange}
          placeholder="Start typing..."
        />
      </div>
    </StyledTextWrapper>
  );
};