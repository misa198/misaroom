import styled from "styled-components";

export const ChatImageViewerWrapper = styled.div<{ display: number }>`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.9);
  transition: all 300ms;
  ${(props) =>
    props.display === 1
      ? `
        opacity: 1;
        visibility: unset;
      `
      : `
        opacity: 0;
        visibility: hidden;
      `}
`;

export const ChatImageViewerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ChatImageViewerImage = styled.img<{ display: number }>`
  max-width: 90vw;
  max-height: 90vh;
  ${(props) =>
    props.display === 1 ? "animation: chatImageViewerImageAppear 300ms;" : ""};

  @keyframes chatImageViewerImageAppear {
    0% {
      transform: scale(0.5);
    }
    100% {
      transform: scale(1);
    }
  }
`;

export const ChatImageViewerCloseButton = styled.button`
  position: absolute;
  top: 13px;
  right: 13px;
  background-color: transparent;
  color: rgba(255, 255, 255, 0.9);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
`;
