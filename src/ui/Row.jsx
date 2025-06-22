import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;

  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: center;
      align-items: center;
    `}

  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;

// We can define default props for this <Row/> as below:
Row.defaultProps = {
  type: "vertical",
}; // In this case, from JSX of <App/>, or even any component, even if we don't pas type="vertical" prop, it will automatically be considered type="vertical"

export default Row;
