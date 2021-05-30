import styled from "styled-components";

export const ChatConversationWrapper = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column-reverse;
  overflow-y: scroll;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    background: #090c10;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }
`;
