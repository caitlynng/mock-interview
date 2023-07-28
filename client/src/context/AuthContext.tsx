import React, { createContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { LoadingPageWrapper } from 'components/AuthPages.styles';

export const AuthContext = createContext<{
  currentUserName: string;
  currentUserEmail: string;
  currentUserId: string;
}>({ currentUserName: '', currentUserId: '', currentUserEmail: '' });

interface Props {
  children?: React.ReactNode;
}

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [currentUserName, setCurrentUserName] = useState('');
  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [currentUserId, setCurrentUserId] = useState('');

  const [loadingApp, setLoadingApp] = useState(true);

  const { uid, name, email } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    const storedAuthData = localStorage.getItem('auth');
    if (storedAuthData) {
      const { name, email, uid } = JSON.parse(storedAuthData);
      setCurrentUserName(name);
      setCurrentUserEmail(email);
      setCurrentUserId(uid);
    } else {
      setCurrentUserName(name);
      setCurrentUserEmail(email);
      setCurrentUserId(uid);
    }

    setLoadingApp(false);
  }, [uid, name, email]);

  useEffect(() => {
    if (currentUserId === undefined) {
      localStorage.removeItem('auth');
    }
  }, [currentUserId]);
  if (loadingApp) {
    return <LoadingPageWrapper>Loading app, please wait...</LoadingPageWrapper>;
  }

  return (
    <AuthContext.Provider
      value={{ currentUserName, currentUserId, currentUserEmail }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
