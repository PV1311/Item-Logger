import styled from "styled-components";

const Textarea = styled.textarea`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  width: 100%;
  min-height: 8rem;
  resize: vertical;
`;

export default Textarea;
