import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from './NavigationBar.styles';
import NavLinks from './NavLinks';

const NavigationBar: React.FC = () => {
  return (
    <Nav>
      <Link to='/'>Logo</Link>
      <NavLinks />
    </Nav>
  );
};

export default NavigationBar;
