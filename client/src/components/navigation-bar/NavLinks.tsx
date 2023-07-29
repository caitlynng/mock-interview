import React, { useContext } from 'react';
import { Button } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { useDispatch } from 'react-redux';

import { AuthContext } from 'context/AuthContext';
import { setUser } from 'redux/slices/usersSlice';

const NavLinks: React.FC = () => {
  const { currentUserId } = useContext(AuthContext);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(setUser({ email: '', name: '', uid: '' }));
    localStorage.removeItem('auth');
    navigate('/login');
  };

  if (currentUserId) {
    return (
      <Stack direction='row' spacing={2}>
        <Button onClick={handleLogout}>Logout</Button>
      </Stack>
    );
  }

  if (pathname === '/login') {
    return <Link to='/register'>Register</Link>;
  }

  return <Link to='/login'>Login</Link>;
};

export default NavLinks;
