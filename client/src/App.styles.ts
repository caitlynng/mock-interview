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

export const OverlayWrapper = styled.div`
  .panel-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 1000;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .form-container {
    height: 100%;
    width: 100%;
    max-width: 500px;
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    animation: slide-in 0.3s ease;
    overflow: auto;
    & > h3 {
      margin-top: calc(100vh / 7);
    }
  }

  @keyframes slide-in {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(0%);
    }
  }
`;
