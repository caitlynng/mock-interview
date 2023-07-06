import styled from 'styled-components';

export const Wrapper = styled.div`
  margin: 1.5em 0;
`;

export const QuestionTheme: { [key: string]: any } = {
  MuiList: {
    styleOverrides: {
      root: {
        boxShadow:
          'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px',
        borderRadius: '5px',
        padding: 0,
      },
    },
  },
  MuiButtonBase: {
    styleOverrides: {
      root: {
        minHeight: '5em',
        backgroundColor: '',
        '&.MuiListItemButton-root:hover': {
          backgroundColor: 'white',
        },
        '&.MuiListItemButton-root': {
          flexWrap: 'wrap-reverse',
          gap: '0.5em',
        },
      },
    },
  },
  MuiCollapse: {
    styleOverrides: {
      root: {
        borderTop: '1px solid #e9ecef',
        '& .MuiButtonBase-root': {
          backgroundColor: 'white',
        },
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        cursor: 'pointer',
      },
    },
  },
};
