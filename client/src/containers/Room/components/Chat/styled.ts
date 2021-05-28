import styled from "styled-components";

export const ChatWrapper = styled.div<{ showChat: boolean }>`
  height: 100%;
  width: ${(props) => (props.showChat ? "300px" : 0)};
  overflow: hidden;
`;
