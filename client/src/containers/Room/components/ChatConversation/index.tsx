import { FC } from "react";
import { useSelector } from "react-redux";

import { ChatConversationWrapper } from "./styled";

import ChatMessage from "../ChatMessage";
import ChatMessageImage from "../ChatMessageImage";

import { RootState } from "../../../../store";

const ChatConversation: FC = () => {
  const messages = useSelector((state: RootState) => state.room.messages);

  return (
    <ChatConversationWrapper>
      <ChatMessage />
      <ChatMessage />
      <ChatMessage />
      <ChatMessage />
      <ChatMessage />
      <ChatMessage />
      <ChatMessage />
      <ChatMessage />
      <ChatMessage />
      <ChatMessage />
      <ChatMessage />
      <ChatMessage />
      <ChatMessage />
      <ChatMessage />
      <ChatMessage />
      <ChatMessage />
      <ChatMessage />
      <ChatMessage />
      <ChatMessage />
      <ChatMessage />
      <ChatMessage />
      <ChatMessage />
      <ChatMessage />
      <ChatMessage />
      <ChatMessage />
      <ChatMessage />
      <ChatMessage />
      <ChatMessage />
      <ChatMessage />
      <ChatMessageImage />
    </ChatConversationWrapper>
  );
};

export default ChatConversation;
