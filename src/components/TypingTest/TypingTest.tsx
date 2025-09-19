import type { ChangeEvent } from 'react';
import { useTextFetch } from '../../hooks/useTextFetch';
import { useTypingTest } from '../../hooks/useTypingTest';
import { useConfiguration } from '../../hooks/useConfiguration';
import { calculateTypingStats } from '../../utils/typingCalculations.ts';
import { ConfigurationPanel } from '../ConfigurationPanel/ConfigurationPanel';
import { TextDisplay } from '../TextDisplay/TestDisplay.tsx';
import { TypingInput } from '../TypingInput/TypingInput';
import { StatsDisplay } from '../StatsDisplay/StatsDisplay';
import { StyledWrapper, StyledHeader } from './TypingTest.styles';

export const TypingTest = () => {
  // configuration
  const { textType, textAmount, handleTextTypeChange, handleTextAmountChange } =
    useConfiguration();

  // fetching
  const { targetText, refetchText } = useTextFetch(textType, textAmount);

  // test state
  const typingTestState = useTypingTest(targetText);

  // test calculation
  const stats = calculateTypingStats(
    typingTestState.startTime,
    typingTestState.endTime,
    typingTestState.userInput,
    typingTestState.errors,
  );

  const handleInputChangeWrapper = (
    event: ChangeEvent<HTMLTextAreaElement>,
  ) => {
    typingTestState.handleInputChange(event.target.value);
  };

  const handleNewText = () => {
    refetchText();
    typingTestState.resetTest();
  };

  const handleConfigurationChange = {
    textType: (type: typeof textType) => {
      handleTextTypeChange(type);
      typingTestState.resetTest();
    },
    textAmount: (amount: number) => {
      handleTextAmountChange(amount);
      typingTestState.resetTest();
    },
  };

  return (
    <StyledWrapper>
      <StyledHeader>
        Type'o Speed Test
      </StyledHeader>

      <ConfigurationPanel
        textType={textType}
        textAmount={textAmount}
        onTextTypeChange={handleConfigurationChange.textType}
        onTextAmountChange={handleConfigurationChange.textAmount}
        handleNewText={handleNewText}
      />

      {targetText && (
        <TextDisplay
          targetText={targetText}
          userInput={typingTestState.userInput}
          currentIndex={typingTestState.currentIndex}
          errors={typingTestState.errors}
        />
      )}

      {targetText && (
        <TypingInput
          isTestStarted={typingTestState.isTestStarted}
          isTestCompleted={typingTestState.isTestCompleted}
          userInput={typingTestState.userInput}
          onInputChange={handleInputChangeWrapper}
          onStartTest={typingTestState.startTest}
        />
      )}

      <StatsDisplay
        stats={stats}
        isTestStarted={typingTestState.isTestStarted}
        isTestCompleted={typingTestState.isTestCompleted}
      />
    </StyledWrapper>
  )
}