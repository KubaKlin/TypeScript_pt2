import { TypingStats } from '../../types';
import {
  StyledStatsWrapper,
  StyledStatsHeader,
  StyledStats,
  StyledStatWrapper,
  StyledStatValue,
} from './StatsDisplay.styles';

interface StatsDisplayProps {
  stats: TypingStats;
  isTestStarted: boolean;
  isTestCompleted: boolean;
  isTimeUp?: boolean;
}

export const StatsDisplay = ({
  stats,
  isTestStarted,
  isTestCompleted,
  isTimeUp = false,
}: StatsDisplayProps) => {
  if (!isTestStarted) return null;

  if (isTestCompleted) {
    const completionTypeText = isTimeUp ? 'Time Up!' : 'Test Completed!';

    return (
      <StyledStatsWrapper>
        <StyledStatsHeader>{completionTypeText}</StyledStatsHeader>
        <StyledStats>
          <StyledStatWrapper>
            <StyledStatValue>{stats.wordsPerMinute}</StyledStatValue>
            <div>Words per Minute</div>
          </StyledStatWrapper>
          <StyledStatWrapper>
            <StyledStatValue>{stats.accuracy}%</StyledStatValue>
            <div>Accuracy</div>
          </StyledStatWrapper>
          <StyledStatWrapper>
            <StyledStatValue>{stats.timeElapsed}s</StyledStatValue>
            <div>Time Taken</div>
          </StyledStatWrapper>
        </StyledStats>
      </StyledStatsWrapper>
    );
  }
};
