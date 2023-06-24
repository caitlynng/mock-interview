import { Button } from '@mui/material';
import { signOut } from 'firebase/auth';
import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { auth } from 'firebaseConfig';
import { Nav, Links } from './NavigationBar.styles';
import { AuthContext } from 'context/AuthContext';

const NavigationBar: React.FC = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = async () => {
    await signOut(auth);

    navigate('/login');
  };

  const LinkComponent = () => {
    if (currentUser) {
      return <Button onClick={handleLogout}>Logout</Button>;
    }

    if (pathname === '/login') {
      return <Link to='/register'>Register</Link>;
    }

    return <Link to='/login'>Login</Link>;
  };

  return (
    <Nav>
      <Link to='/'>All Questions</Link>

      <Link to='/behavioral'>Behavioral</Link>

      <Link to='/technical'>Technical</Link>

      <Links>
        <LinkComponent />
      </Links>
    </Nav>
  );
};

export default NavigationBar;
