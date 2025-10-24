import { styled } from '@mui/material/styles';

export const StyledWrapper = styled('div')(({ theme }) => ({
  maxWidth: '1000px',
  margin: '0 auto',
  padding: '20px',
  fontFamily: 'Arial, sans-serif',
  [theme.breakpoints.down('sm')]: {
    padding: 0,
  },
}));

export const StyledHeader = styled('h1')(({ theme }) => ({
  textAlign: 'center',
  color: '#999',
  marginBottom: '30px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '22px',
    marginBottom: '20px',
  },
}));
