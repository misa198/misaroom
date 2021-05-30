import { FC } from "react";

import { ChatConversationWrapper } from "./styled";

import ChatMessage from "../ChatMessage";

const ChatConversation: FC = () => {
  return (
    <ChatConversationWrapper>
      <ChatMessage />
      <ChatMessage />
      <ChatMessage />
      <ChatMessage />
      <ChatMessage />
      <ChatMessage />
    </ChatConversationWrapper>
  );
};

export default ChatConversation;
