import { styled } from '@mui/material/styles';

export const StyledPanelWrapper = styled('div')(({ theme }) => ({
  padding: '20px',
  borderRadius: '10px',
  marginBottom: '20px',
  [theme.breakpoints.down('sm')]: {
    padding: 0,
  },
}));

export const StyledPanelHeader = styled('h3')(() => ({
  margin: '0 0 15px 0',
}));

export const StyledSelect = styled('select')(() => ({
  padding: '5px 10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
}));

export const StyledInput = styled('input')(() => ({
  padding: '5px 10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  width: '80px',
}));

export const StyledOptionsWrapper = styled('div')(() => ({
  display: 'flex',
  gap: '20px',
  alignItems: 'center',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  maxWidth: '700px',
  margin: '0 auto',
}));

export const StyledButton = styled('button')(() => ({
  padding: '8px 16px',
  backgroundColor: '#2196f3',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
}));
