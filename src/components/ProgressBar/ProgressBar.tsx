import { 
  StyledProgressContainer,
  StyledProgressBar, 
} from './ProgressBar.styles';

interface ProgressBarProps {
  progress: number;
  currentIndex: number;
}

export const ProgressBar = ({progress, currentIndex}: ProgressBarProps) => {

  if (currentIndex === 0) {
    return null;
  }

  return (
    <StyledProgressContainer>
      <StyledProgressBar progress={progress} />
    </StyledProgressContainer>
  );
};