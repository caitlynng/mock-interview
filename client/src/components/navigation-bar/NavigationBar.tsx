import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, NavContainer } from './NavigationBar.styles';
import NavLinks from './NavLinks';

const NavigationBar: React.FC = () => {
  return (
    <Nav>
      <NavContainer>
        <Link to='/'>Logo</Link>
        <NavLinks />
      </NavContainer>
    </Nav>
  );
};

export default NavigationBar;
