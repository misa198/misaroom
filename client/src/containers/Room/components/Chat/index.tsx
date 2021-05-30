import { FC, memo } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../../../store";

import { ChatWrapper, ChatContainer } from "./styled";

import ChatHeader from "../ChatHeader";
import ChatConversation from "../ChatConversation";
import ChatInput from "../ChatInput";
import ChatImageViewer from "../ChatImageViewer";

const Chat: FC = () => {
  const showChat = useSelector(
    (state: RootState) => state.room.status.showChat
  );
  const imageViewer = useSelector((state: RootState) => state.room.imageViewer);

  return (
    <ChatWrapper showChat={showChat}>
      <ChatContainer>
        <ChatHeader />
        <ChatConversation />
        <ChatInput />
      </ChatContainer>
      <ChatImageViewer />
    </ChatWrapper>
  );
};

export default memo(Chat);
