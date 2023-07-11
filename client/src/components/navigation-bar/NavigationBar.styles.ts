import styled from 'styled-components';

export const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0px 10px;
  min-height: 70px;
  gap: 10px;
  & a:first-child {
    margin-right: auto;
  }
`;
