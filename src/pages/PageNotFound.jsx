import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: var(--color-grey-50);
  color: var(--color-grey-700);
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 4rem;
  color: var(--color-red-700);
`;

const Message = styled.p`
  font-size: 1.6rem;
  color: var(--color-grey-600);
`;

const StyledLink = styled(Link)`
  margin-top: 1rem;
  display: inline-block;
  font-size: 1.4rem;
  color: var(--color-brand-600);
  text-decoration: underline;
`;

function PageNotFound() {
  return (
    <Wrapper>
      <Title>404</Title>
      <Message>Oops! The page you are looking for does not exist.</Message>
      <StyledLink to="/">← Go back to Dashboard</StyledLink>
    </Wrapper>
  );
}

export default PageNotFound;
