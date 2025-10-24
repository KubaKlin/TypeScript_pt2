import { styled } from '@mui/material/styles';

export const StyledTextWrapper = styled('div')(({ theme }) => ({
  padding: '20px',
  borderRadius: '10px',
  marginBottom: '20px',
  [theme.breakpoints.down('sm')]: {
    padding: 0,
  },
}));

export const StyledButtonWrapper = styled('div')(() => ({
  textAlign: 'center',
  marginTop: '25px',
}));

export const StyledButton = styled('button')(() => ({
  padding: '12px 24px',
  fontSize: '18px',
  backgroundColor: '#4caf50',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
}));

export const StyledTextArea = styled('textarea')(({ theme }) => ({
  width: '100%',
  height: '120px',
  padding: '15px',
  fontSize: '16px',
  fontFamily: 'monospace',
  border: '2px solid #ddd',
  borderRadius: '8px',
  resize: 'none',
  outline: 'none',
  [theme.breakpoints.down('sm')]: {
    width: 'auto',
  },
}));
