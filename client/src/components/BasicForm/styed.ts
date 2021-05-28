import styled from "styled-components";

export const BasicFormOutsideBorder = styled.div`
  padding: 2px;
  background-color: rgba(0, 0, 0, 0.9);
  border-radius: 8px;
  border: 2px solid #fff;
  width: 300px;
  animation: formAppear 300ms;
`;

export const BasicFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 2rem 1rem;
  border-radius: 6px;
  border: 1px solid #fff;
`;

export const BasicFormTitle = styled.div`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
`;

export const BasicForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const BasicFormFieldWrapper = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 1.5rem;

  ::placeholder {
    color: #fff;
  }

  ::-webkit-input-placeholder {
    color: #fff;
    opacity: 1;
  }
`;

export const BasicFormField = styled.input`
  width: 100%;
  background-color: transparent;
  font-size: 1rem;
  color: #fff;
  padding: 0.25rem 0;
  border: none;
  border-bottom: 1px solid #fff;
  border-radius: 0;
  outline: none;
`;

export const BasicFormFieldError = styled.div`
  color: red;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

export const BasicFormButton = styled.button.attrs({ type: "submit" })`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: #fff;
  background-color: #000;
  border-radius: 0.25rem;
  border: 1px solid #fff;
  outline: none;
  cursor: pointer;
  user-select: none;
`;
