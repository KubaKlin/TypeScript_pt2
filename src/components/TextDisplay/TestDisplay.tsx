import { StyledTextText } from './TextDisplay.styles';
import { getCharacterStyle } from '../../utils/characterStyling';

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
  if (!targetText) {
    return null;
  }

  return (
    <StyledTextText>
      {targetText.split('').map((singleCharacter: string, index: number) => {
        const characterStyle = getCharacterStyle(
          index,
          userInput.length,
          currentIndex,
          errors,
        );

        return (
          <span key={index} style={characterStyle}>
            {singleCharacter}
          </span>
        );
      })}
    </StyledTextText>
  );
};
