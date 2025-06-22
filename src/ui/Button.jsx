import styled, { css } from "styled-components";

const variations = {
  primary: css`
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
    font-size: 1.4rem;
    padding: 1rem 1.6rem;
    font-weight: 500;

    &:hover {
      background-color: var(--color-brand-700);
    }
  `,
  secondary: css`
    background-color: var(--color-grey-0);
    color: var(--color-grey-700);
    border: 1px solid var(--color-grey-300);
    font-size: 1.4rem;
    padding: 1rem 1.6rem;
    font-weight: 500;

    &:hover {
      background-color: var(--color-grey-100);
    }
  `,
};

const Button = styled.button`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: all 0.2s ease;

  ${(props) => variations[props.variation]}

  &:disabled {
    background-color: var(--color-grey-200);
    color: var(--color-grey-500);
    cursor: not-allowed;
  }
`;

Button.defaultProps = {
  variation: "primary",
  size: "medium",
};

export default Button;
