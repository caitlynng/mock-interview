import styled from 'styled-components';
import { primaryColor } from 'App.styles';

export const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0px 10px;
  min-height: 70px;
  gap: 10px;
`;

export const Links = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
  align-items: center;
`;
