import styled from "styled-components";

export const ChatWrapper = styled.div<{ showChat: boolean }>`
  height: 100%;
  width: ${(props) => (props.showChat ? "300px" : 0)};
  overflow: hidden;
  transition: width 300ms ease-in-out;
  border-left: ${(props) =>
    props.showChat ? "1px solid rgba(255, 255, 255, 0.05)" : "none"};
`;

export const ChatContainer = styled.div`
  height: 100%;
  width: 300px;
  display: flex;
  flex-direction: column;
`;
