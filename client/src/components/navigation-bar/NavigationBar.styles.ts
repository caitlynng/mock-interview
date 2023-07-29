import styled from 'styled-components';

export const Nav = styled.nav`
  gap: 10px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: white;
  & a:first-child {
    margin-right: auto;
  }
`;
export const NavContainer = styled.div`
  position: relative; /* This keeps the container in the normal flow */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0px 10px;
  min-height: 70px;
`;
