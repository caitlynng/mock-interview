import styled from 'styled-components';
import { primaryColor } from 'App.styles';

export const Wrapper = styled.div`
  margin: 0 auto;
  padding: 1em;
`;
export const AddQuestionWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  & button {
    background-color: ${primaryColor};
    color: #fff;
    min-height: 1em;
    outline: none;
    font-size: 0.8rem;
    border-radius: 6px;
    padding: 12px;
  }
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
  MuiModal: {
    styleOverrides: {
      root: {
        zIndex: 1001,
      },
    },
  },
};
