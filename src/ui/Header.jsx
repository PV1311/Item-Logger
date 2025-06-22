import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledHeader = styled.header`
  background-color: var(--color-grey-300);
  // color: var(--color-grey-500);
  padding: 1.6rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Brand = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-grey-700);
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
`;

const StyledNavLink = styled(NavLink)`
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-grey-600);
  text-decoration: none;

  &.active {
    color: var(--color-brand-600);
    font-weight: 600;
  }

  &:hover {
    color: var(--color-brand-700);
  }
`;

function Header() {
  return (
    <StyledHeader>
      <Brand>Item Logger</Brand>

      <Nav>
        <StyledNavLink to="/items">View Items</StyledNavLink>
        <StyledNavLink to="/addItems">Add Item</StyledNavLink>
      </Nav>
    </StyledHeader>
  );
}

export default Header;
