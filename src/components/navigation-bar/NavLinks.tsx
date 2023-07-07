import { Button } from '@mui/material';
import { signOut } from 'firebase/auth';
import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { auth } from 'firebaseConfig';
import { AuthContext } from 'context/AuthContext';

const NavLinks: React.FC = () => {
  const { currentUser } = useContext(AuthContext);
  const { pathname } = useLocation();

  const navigate = useNavigate();
  const handleLogout = async () => {
    await signOut(auth);

    navigate('/login');
  };

  if (currentUser) {
    return (
      <Stack direction='row' spacing={2}>
        <Button>AI Generate Questions</Button>
        <Button>Add Question</Button>
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
