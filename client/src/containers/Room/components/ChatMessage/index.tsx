import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { RootState } from "../../../../store";

import { socket } from "../../../../shared/socket/SocketProvider";

import { deleteMessage } from "../../../../store/slice/room.slice";

interface PropTypes {
  message: Message;
}

const ChatMessage: FC<PropTypes> = ({ message }: PropTypes) => {
  const dispatch = useDispatch();
  const roomId = useSelector((state: RootState) => state.room.id);
  const [isSender, setIsSender] = useState(false);

  useEffect(() => {
    setIsSender(message.senderId === socket.id);
  }, [message.senderId]);

  function removeMessage(): void {
    socket.emit("remove-message", {
      messageId: message.id,
      roomId,
    });
    dispatch(deleteMessage(message.id));
  }

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
        <ChatMessageContent removed={message.type === "removed"}>
          {message.content}
        </ChatMessageContent>
      </ChatMessageContentWrapper>
      <Tooltip effect="solid" place="top" />
      <ChatMessageButtonsWrapper isSender={isSender}>
        {isSender && message.type !== "removed" && (
          <>
            <ChatMessageButton data-tip="Delete" onClick={removeMessage}>
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
