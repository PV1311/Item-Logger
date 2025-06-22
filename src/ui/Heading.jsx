import styled, { css } from "styled-components";

const Heading = styled.h1`
  line-height: 1.4;
  font-weight: 600;
  text-shadow: 2px 2px 2px rgba(239, 239, 239, 0.707);

  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2.4rem;
    `}

  ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
    `}
`;

Heading.defaultProps = {
  as: "h1",
};

export default Heading;
