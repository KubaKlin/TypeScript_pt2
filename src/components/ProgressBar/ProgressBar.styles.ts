import { styled } from '@mui/material/styles';

export const StyledProgressContainer = styled('div')(() => ({
  width: '100%',
  height: '12px',
  backgroundColor: '#e0e0e0',
  borderRadius: '4px',
  overflow: 'hidden',
  position: 'relative',
  margin: '20px auto 0',
}));

export const StyledProgressBar = styled('div')<{ progress: number }>(({ progress }) => ({
  height: '100%',
  width: `${progress}%`,
  backgroundColor: '#1976d2',
  borderRadius: '4px',
  transition: 'width 0.2s ease-in-out',
}));
