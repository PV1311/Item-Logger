import { Outlet } from "react-router-dom";
import Header from "./Header";
import styled from "styled-components";

const Main = styled.main`
  position: relative;
  padding: 4rem 4.8rem 6.4rem;
  height: 100vh;
  overflow-y: auto;
  z-index: 0;

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-image: url("/BG.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    // opacity: 0.5;
    // filter: blur(1px);
    z-index: -1;
    pointer-events: none;
  }
`;

const Container = styled.div`
  max-width: 110rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function AppLayout() {
  return (
    <div>
      <Header />

      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </div>
  );
}

export default AppLayout;
