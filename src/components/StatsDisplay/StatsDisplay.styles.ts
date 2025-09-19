import { styled } from '@mui/material/styles';

export const StyledStatsWrapper = styled('div')(() => ({
  padding: '20px',
  borderRadius: '10px',
}));

export const StyledStatsHeader = styled('div')(() => ({
  margin: '0 0 15px 0',
  color: '#2e7d32'
}));


export const StyledStats = styled('button')(() => ({
  display: 'flex',
  gap: '15px',
  justifyContent: 'space-around',
}));

export const StyledStatWrapper = styled('textarea')(() => ({
  textAlign: 'center',
}));

export const StyledStatValue = styled('textarea')(() => ({
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#1976d2',
}));
