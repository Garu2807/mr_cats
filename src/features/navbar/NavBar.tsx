import { Container, LinkText, Navbar, StyledLink } from './NavBar.styles';
function NavBar() {
  return (
    <Navbar>
      <Container>
        <StyledLink to={'/'}>
          <LinkText>Все котики</LinkText>
        </StyledLink>
        <StyledLink to={'/likes'}>
          <LinkText>Любимые котики</LinkText>
        </StyledLink>
      </Container>
    </Navbar>
  );
}

export default NavBar;
