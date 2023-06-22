import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'redux/store';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { AppWrapper, materialDefaultTheme } from './App.styles';
import InterviewPanel from 'pages/Interview';
import Register from 'pages/Register';
import Login from 'pages/Login';
import AuthProvider from 'context/AuthContext';
import PrivateRoute from 'components/PrivateRoute';
import PublicOnlyRoute from 'components/PublicOnlyRoute';

const defaultTheme = createTheme({ components: materialDefaultTheme });

const App: React.FC = () => (
  <Provider store={store}>
    <AppWrapper>
      <ThemeProvider theme={defaultTheme}>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route
                path='/'
                element={
                  <PrivateRoute>
                    <InterviewPanel />
                  </PrivateRoute>
                }
              />
              <Route
                path='/register'
                element={
                  <PublicOnlyRoute>
                    <Register />
                  </PublicOnlyRoute>
                }
              />
              <Route
                path='/login'
                element={
                  <PublicOnlyRoute>
                    <Login />
                  </PublicOnlyRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </AppWrapper>
  </Provider>
);

export default App;
