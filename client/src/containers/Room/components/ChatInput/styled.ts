import styled from "styled-components";

export const ChatInputWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
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

export const ChatInputMessageFile = styled.input.attrs({
  type: "file",
  accept: "image/png, image/jpg, image/jpeg",
})`
  display: none;
`;

export const ChatInputPreviewImageWrapper = styled.div<{ isShow: boolean }>`
  position: absolute;
  height: 100px;
  top: -101px;
  left: 0px;
  padding: 5px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: none;
  border-left: none;
  overflow: hidden;
  transition: transform 200ms;
  transform: ${(props) =>
    props.isShow ? "translateX(0);" : "translateX(-100%);"};
`;

export const ChatInputPreviewImageContainer = styled.div`
  position: relative;
  height: 90px;
  min-width: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ChatInputPreviewImage = styled.img`
  max-height: 100%;
  max-width: 290px;
  border-radius: 5px;
`;

export const ChatInputPreviewMessageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 90px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ChatInputPreviewMessageButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin: 2px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  background: linear-gradient(-225deg, #3d4e81 0%, #5753c9 48%, #6e7ff3 100%);
  cursor: pointer;
`;
