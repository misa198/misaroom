import { FC, memo } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../../../store";

import { ChatWrapper } from "./styled";

import ChatConversation from "../ChatConversation";
import ChatInput from "../ChatInput";

const Chat: FC = () => {
  const showChat = useSelector(
    (state: RootState) => state.room.status.showChat
  );

  return (
    <ChatWrapper showChat={showChat}>
      <ChatConversation />
      <ChatInput />
    </ChatWrapper>
  );
};

export default memo(Chat);
