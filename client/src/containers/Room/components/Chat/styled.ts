import styled from "styled-components";

export const ChatWrapper = styled.div<{ showChat: boolean }>`
  height: 100%;
  width: ${(props) => (props.showChat ? "300px" : 0)};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all 300ms ease-in-out;
`;
