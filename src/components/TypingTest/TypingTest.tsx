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
import { useHighScore } from '../../hooks/useHighScore';

export const TypingTest = () => {
  const { textType, textAmount, timeLimitInSeconds } = useConfiguration();

  const { targetText, refetchText } = useTextFetch(textType, textAmount);

  const { highScore, checkForHighScore } = useHighScore();

  const typingTestState = useTypingTest(
    targetText,
    timeLimitInSeconds,
    checkForHighScore,
  );

  const stats = calculateTypingStats(
    typingTestState.startTime,
    typingTestState.endTime,
    typingTestState.userInput,
    typingTestState.errors,
  );

  const progress = calculateProgress(
    typingTestState.currentIndex,
    targetText.length,
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

  return (
    <StyledWrapper>
      <StyledHeader>Type'o Speed Test</StyledHeader>
      {highScore && <StyledHeader>Highest score: {highScore} WPM</StyledHeader>}

      <ConfigurationPanel
        handleNewText={handleNewText}
        onConfigChange={typingTestState.resetTest}
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
        timeLimitInSeconds={timeLimitInSeconds}
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
