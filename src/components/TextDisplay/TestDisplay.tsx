import { StyledTextText } from './TextDisplay.styles';

interface TextDisplayProps {
  targetText: string;
  userInput: string;
  currentIndex: number;
  errors: Set<number>;
}

export const TextDisplay = ({
  targetText,
  userInput,
  currentIndex,
  errors,
}: TextDisplayProps) => {
  if (!targetText) return null;

  return (
    <StyledTextText>
      {targetText.split('').map((singleCharacter: string, index: number) => {
        let backgroundColor = '';
        let color = '';

        if (index < userInput.length) {
          if (errors.has(index)) {
            backgroundColor = '#ffebee';
            color = '#d32f2f';
          } else {
            backgroundColor = '#e8f5e8';
            color = '#2e7d32';
          }
        } else if (index === currentIndex) {
          backgroundColor = '#bbdefb';
          color = '#000';
        }

        return (
          <span
            key={index}
            style={{
              backgroundColor,
              color,
            }}
          >
            {singleCharacter}
          </span>
        );
      })}
    </StyledTextText>
  );
};