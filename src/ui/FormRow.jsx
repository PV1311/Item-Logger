import styled from "styled-components";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr;
  gap: 1.4rem;

  padding: 1.1rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    padding-top: 3.2rem;
    gap: 2.4rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
  color: var(--color-grey-50);
`;

const Error = styled.span`
  font-size: 1.2rem;
  color: var(--color-red-700);
`;

function FormRow({ label, error, children }) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
    // Now we needed to make the htmFor prop here in the <Label/> dynamic. So the value we pass in htmlFor attribute is the id of the <Input/>. So when we click the
    // label, the input will be selected, so they are basically connected by the id. So here we access the id in htmlFor in <Label/> by doing children.props.id. So the
    // <Input/> will be the children here in this <FormRow/> and since we know that we have only one children, we can do children.props.id(so the children will be input
    // here and that input will receive the id as prop).
  );
}

export default FormRow;
