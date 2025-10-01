import { styled } from '@mui/material/styles';

export const StyledProgressContainer = styled('div')(() => ({
  width: '100%',
  height: '12px',
  backgroundColor: '#e0e0e0',
  borderRadius: '6px',
  overflow: 'hidden',
  margin: '20px auto 0',
}));

export const StyledProgressBar = styled('div')<{ progress: number }>(
  ({ progress }) => ({
    height: '100%',
    width: `${progress}%`,
    backgroundColor: '#1976d2',
    transition: 'width 0.2s ease-in-out',
  }),
);
