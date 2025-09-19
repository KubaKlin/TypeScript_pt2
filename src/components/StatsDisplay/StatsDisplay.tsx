import { TypingStats } from '../../types';
import { StyledStatsWrapper, StyledStatsHeader, StyledStats, StyledStatWrapper, StyledStatValue } from './StatsDisplay.styles';

interface StatsDisplayProps {
  stats: TypingStats;
  isTestStarted: boolean;
  isTestCompleted: boolean;
}

export const StatsDisplay = ({
  stats,
  isTestStarted,
  isTestCompleted,
}: StatsDisplayProps) => {
  if (!isTestStarted) return null;

  if (isTestCompleted) {
    return (
      <StyledStatsWrapper>
        <StyledStatsHeader>
          Test Completed!
        </StyledStatsHeader>
        <StyledStats>
          <StyledStatWrapper>
            <StyledStatValue>
              {stats.wordsPerMinute}
            </StyledStatValue>
            <div>Words per Minute</div>
          </StyledStatWrapper>
          <StyledStatWrapper>
            <StyledStatValue>
              {stats.accuracy}%
            </StyledStatValue>
            <div>Accuracy</div>
          </StyledStatWrapper>
          <StyledStatWrapper>
            <StyledStatValue>
              {stats.timeElapsed}s
            </StyledStatValue>
            <div>Time Taken</div>
          </StyledStatWrapper>
        </StyledStats>
      </StyledStatsWrapper>
    );
  }
};