import { styled } from '@mui/material/styles';

export const StyledTimerWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '10px 0',
}));

export const StyledTimer = styled('div')(() => ({
  fontSize: '24px',
  fontWeight: 'bold',
  padding: '10px 20px',
  borderRadius: '8px',
  backgroundColor: '#e3f2fd',
  color: '#1976d2',
  border: '2px solid #1976d2',
}));

export const StyledTimerLabel = styled('span')(() => ({
  fontSize: '14px',
  marginRight: '8px',
  fontWeight: 'normal',
}));
