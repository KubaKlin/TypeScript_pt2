import type { ChangeEvent } from 'react';
import { useTextFetch } from '../../hooks/useTextFetch';
import { useTypingTest } from '../../hooks/useTypingTest';
import { useConfiguration } from '../../hooks/useConfiguration';
import {
  calculateProgress,
  calculateTypingStats,
} from '../../utils/typingCalculations.ts';
import { ConfigurationPanel } from '../ConfigurationPanel/ConfigurationPanel';
import { TextDisplay } from '../TextDisplay/TestDisplay.tsx';
import { TypingInput } from '../TypingInput/TypingInput';
import { StatsDisplay } from '../StatsDisplay/StatsDisplay';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import { Timer } from '../Timer/Timer';
import { StyledWrapper, StyledHeader } from './TypingTest.styles';

export const TypingTest = () => {
  // configuration
  const {
    textType,
    textAmount,
    timeLimit,
    handleTextTypeChange,
    handleTextAmountChange,
    handleTimeLimitChange,
  } = useConfiguration();

  // fetching
  const { targetText, refetchText } = useTextFetch(textType, textAmount);

  // test state
  const typingTestState = useTypingTest(targetText, timeLimit);

  // test calculation
  const stats = calculateTypingStats(
    typingTestState.startTime,
    typingTestState.endTime,
    typingTestState.userInput,
    typingTestState.errors,
  );

  // progress calculation
  const progress = calculateProgress(
    typingTestState.currentIndex,
    targetText?.length,
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
    timeLimit: (time: number) => {
      handleTimeLimitChange(time);
      typingTestState.resetTest();
    },
  };

  return (
    <StyledWrapper>
      <StyledHeader>Type'o Speed Test</StyledHeader>

      <ConfigurationPanel
        textType={textType}
        textAmount={textAmount}
        timeLimit={timeLimit}
        onTextTypeChange={handleConfigurationChange.textType}
        onTextAmountChange={handleConfigurationChange.textAmount}
        onTimeLimitChange={handleConfigurationChange.timeLimit}
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

      <Timer
        timeRemaining={typingTestState.timeRemaining}
        timeLimit={timeLimit}
        isTestStarted={typingTestState.isTestStarted}
        isTimeUp={typingTestState.isTimeUp}
      />

      {targetText && (
        <ProgressBar
          progress={progress}
          currentIndex={typingTestState.currentIndex}
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
        isTimeUp={typingTestState.isTimeUp}
      />
    </StyledWrapper>
  );
};
