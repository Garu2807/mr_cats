import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Navbar = styled.nav`
  width: 100%;
  height: 64px;
  background-color: #2196f3;
  padding-left: 50px;
`;

export const Container = styled.div`
  width: 293px;
  height: 100%;
  display: flex;
  align-items: center;
`;

export const StyledLink = styled(Link)`
  padding: 0 20px;
  height: 100%;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1e88e5;

    span {
      transform: scale(1.1);
      transition: transform 0.3s ease;
    }
  }
`;

export const LinkText = styled.span`
  display: inline-block;
  transition: transform 0.3s ease;
`;
