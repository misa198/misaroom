import styled from "styled-components";

export const ChatInputWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

export const ChatInputImageButton = styled.button<{ hide: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: #6e7ff3;
  margin-right: 11px;
  outline: none;
  border: none;
  transition: all 300ms;
  width: 18px;
  cursor: pointer;

  ${(props) =>
    props.hide
      ? `
      transform: scale(0);
      width: 0;
      margin: 0;
    `
      : ""};
`;

export const ChatInputForm = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const ChatInputTextField = styled.input`
  flex: 1;
  padding: 7px 8px;
  font-size: 0.9rem;
  border: none;
  outline: none;
  border-radius: 0.2rem;
  background-color: rgba(255, 255, 255, 0.2);
  color: #fff;
  font-weight: 300;

  ::placeholder {
    font-weight: 300;
  }

  ::-webkit-input-placeholder {
    opacity: 1;
    font-weight: 300;
  }
`;

export const ChatInputButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: #6e7ff3;
  margin-left: 11px;
  outline: none;
  border: none;
  cursor: pointer;
`;
