import styled from "styled-components";

export const FormLoaderOutside = styled.div`
  width: 300px;
  padding: 2px;
  background-color: rgba(0, 0, 0, 0.9);
  border-radius: 8px;
  border: 2px solid #fff;
  animation: formAppear 300ms;
`;

export const FormLoaderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: 6px;
  border: 1px solid #fff;
  padding: 50px 0;
`;

export const FormLoaderText = styled.div`
  margin-top: 1rem;
`;
