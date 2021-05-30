import { FC, useEffect, useState } from "react";
import { Trash } from "react-feather";
import Tooltip from "react-tooltip";

import {
  ChatMessageWrapper,
  ChatMessageAvatarWrapper,
  ChatMessageAvatar,
  ChatMessageSender,
  ChatMessageContentWrapper,
  ChatMessageContent,
  ChatMessageButtonsWrapper,
  ChatMessageButton,
} from "./styled";

import { Message } from "../../../../types/Message";

import { socket } from "../../../../shared/socket/SocketProvider";

interface PropTypes {
  message: Message;
}

const ChatMessage: FC<PropTypes> = ({ message }: PropTypes) => {
  const [isSender, setIsSender] = useState(false);

  useEffect(() => {
    setIsSender(message.senderId === socket.id);
  }, [message.senderId]);

  return (
    <ChatMessageWrapper isSender={isSender}>
      <ChatMessageAvatarWrapper isSender={isSender}>
        <ChatMessageAvatar src={message.avatar} />
      </ChatMessageAvatarWrapper>
      <ChatMessageContentWrapper
        isSender={isSender}
        data-tip={`${new Date(message.time).toLocaleDateString()} ${new Date(
          message.time
        ).toLocaleTimeString()}`}
      >
        <ChatMessageSender isSender={isSender}>
          {message.sender}
        </ChatMessageSender>
        <ChatMessageContent>{message.content}</ChatMessageContent>
      </ChatMessageContentWrapper>
      <Tooltip effect="solid" place="top" />
      <ChatMessageButtonsWrapper isSender={isSender}>
        {isSender && (
          <>
            <ChatMessageButton data-tip="Delete">
              <Trash size={16} />
            </ChatMessageButton>
            <Tooltip effect="solid" place="top" />
          </>
        )}
      </ChatMessageButtonsWrapper>
    </ChatMessageWrapper>
  );
};

export default ChatMessage;
