import styled from "styled-components";

export const ChatMessageWrapper = styled.div<{ isSender: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: ${(props) => (props.isSender ? "row-reverse" : "row")};
  align-items: flex-start;
  padding: ${(props) => (props.isSender ? "8px 10px" : "12px 10px")};
`;

export const ChatMessageAvatarWrapper = styled.div<{ isSender: boolean }>`
  padding: 5px;
  background-image: linear-gradient(
    -225deg,
    #3d4e81 0%,
    #5753c9 48%,
    #6e7ff3 100%
  );
  border-radius: 100px;
  overflow: hidden;
  ${(props) => (props.isSender ? "margin-left: 10px" : "margin-right: 10px;")};
`;

export const ChatMessageAvatar = styled.div<{ src: string }>`
  width: 20px;
  height: 20px;
  border-radius: 100px;
  background-image: url(${(props) => props.src});
  background-size: cover;
`;

export const ChatMessageSender = styled.div<{ isSender: boolean }>`
  display: ${(props) => (props.isSender ? "none" : "unset")};
  position: absolute;
  left: 3px;
  top: -18px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  pointer-events: none;
`;

export const ChatMessageContentWrapper = styled.div<{
  isSender: boolean;
  isImageContent?: boolean;
}>`
  position: relative;
  ${(props) => (props.isImageContent ? "" : "padding: 8px")};
  background: ${(props) =>
    props.isSender
      ? `
      linear-gradient(
        -225deg,
        #3d4e81 0%,
        #5753c9 48%,
        #6e7ff3 100%
      )
      `
      : "rgba(255,255,255,0.2)"};
  border-radius: 0.35rem;
  background: ${(props) => (props.isImageContent ? "transparent" : "")};
  height: fit-content;
`;

export const ChatMessageContent = styled.p`
  font-weight: 300;
  font-size: 0.9rem;
`;

export const ChatMessageContentImage = styled.img`
  width: 100%;
  height: 100%;
  max-width: 150px;
  height: auto;
  border-radius: 0.35rem;
`;