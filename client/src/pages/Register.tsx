import React, { ChangeEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import { materialDefaultTheme, authPageDefaultTheme } from 'App.styles';
import { RegistrationFormData, useRegistration } from 'hooks/authHooks';

const defaultTheme = createTheme({
  components: {
    ...materialDefaultTheme,
    ...authPageDefaultTheme,
  },
});

const Register: React.FC = () => {
  const navigate = useNavigate();

  const { handleSubmit, formData, setFormData } = useRegistration();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData: RegistrationFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
      isCheck: e.target.checked,
    }));
  };

  const { name, email, password, isCheck, error, loading } = formData;

  const onGoToLogin = () => {
    navigate('/login');
  };

  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      return () => {
        clearTimeout(timer);
        setShowAlert(true);
      };
    }
  }, [error]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              {error && showAlert && (
                <Grid item xs={12}>
                  <Alert severity='error'>
                    <AlertTitle>{error}</AlertTitle>
                  </Alert>
                </Grid>
              )}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='name'
                  label='Name'
                  name='name'
                  autoComplete='username'
                  value={name}
                  onChange={handleChange}
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='email'
                  label='Email'
                  name='email'
                  autoComplete='email'
                  value={email}
                  disabled={loading}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='current-password'
                  value={password}
                  onChange={handleChange}
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isCheck}
                      onChange={handleChange}
                      disabled={loading}
                      name='isCheck'
                      required
                    />
                  }
                  label='Creating an account means you agree with our Terms of Service and Privacy Policy.'
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? 'Please wait...' : 'Create account'}
            </Button>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link onClick={onGoToLogin} variant='body2' component='button'>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Register;
