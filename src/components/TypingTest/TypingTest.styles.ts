import { styled } from '@mui/material/styles';

export const StyledWrapper = styled('div')(() => ({
  maxWidth: '1000px',
  margin: '0 auto',
  padding: '20px',
  fontFamily: 'Arial, sans-serif',
}));

export const StyledHeader = styled('h1')(() => ({
  textAlign: 'center',
  color: '#999',
  marginBottom: '30px',
}));
