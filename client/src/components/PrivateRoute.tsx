import React, { useContext } from 'react';
import { AuthContext } from 'context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

interface Props {
  children: JSX.Element;
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const { currentUserId } = useContext(AuthContext);
  const location = useLocation();

  if (currentUserId) {
    return children;
  }

  localStorage.removeItem('auth');

  return <Navigate to='/login' state={{ from: location }} replace />;
};

export default PrivateRoute;
