import styled from 'styled-components';

export const AppWrapper = styled.div`
  height: 100vh;
  width: 100vw;
`;

export const primaryColor = '#4d4dff';
export const primaryColorHover = '#6666ff';
export const boxShadow =
  'rgba(77, 77, 255, 0.12) 0px 1px 3px, rgba(77, 77, 255, 0.24) 0px 1px 3px';

export const materialDefaultTheme: { [key: string]: object } = {
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline,.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline, .MuiInputLabel-root.Mui-focused ':
          {
            borderColor: primaryColor,
            color: primaryColor,
          },
      },
    },
  },
  MuiLink: {
    styleOverrides: {
      root: {
        color: primaryColor,
        textDecoration: 'none',
        cursor: 'pointer',
      },
    },
  },

  MuiFormControlLabel: {
    styleOverrides: {
      root: {
        alignItems: 'start',
      },
    },
  },
  MuiCheckbox: {
    styleOverrides: {
      root: {
        padding: '0 9px',
      },
    },
  },
  MuiButtonBase: {
    styleOverrides: {
      root: {
        '&.MuiCheckbox-root.Mui-checked, &.MuiCheckbox-root.MuiCheckbox-indeterminate':
          {
            color: primaryColor,
          },
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: 'capitalize',
        '&:hover': {
          backgroundColor: 'transparent',
        },
      },
    },
  },
};

export const authPageDefaultTheme: { [key: string]: object } = {
  MuiButton: {
    styleOverrides: {
      root: {
        backgroundColor: primaryColor,
        textTransform: 'capitalize',
        '&:hover': {
          backgroundColor: primaryColorHover,
        },
      },
    },
  },
};
