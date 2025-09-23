import {
  StyledTimerWrapper,
  StyledTimer,
  StyledTimerLabel,
} from './Timer.styles';

interface TimerProps {
  timeRemaining: number;
  timeLimitInSeconds: number;
  isTestStarted: boolean;
  isTimeUp: boolean;
}

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const Timer = ({
  timeRemaining,
  timeLimitInSeconds,
  isTestStarted,
  isTimeUp,
}: TimerProps) => {
  if (!isTestStarted || timeLimitInSeconds === 0 || isTimeUp) {
    return null;
  }

  return (
    <StyledTimerWrapper>
      <StyledTimer>
        <StyledTimerLabel>Time:</StyledTimerLabel>
        {formatTime(timeRemaining)}
      </StyledTimer>
    </StyledTimerWrapper>
  );
};
