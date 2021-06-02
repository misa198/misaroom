import { FC, useState, memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tooltip from "react-tooltip";
import { Trash, AlertCircle } from "react-feather";
import Loader from "react-loader-spinner";

import {
  ChatMessageWrapper,
  ChatMessageAvatarWrapper,
  ChatMessageAvatar,
  ChatMessageSender,
  ChatMessageContentWrapper,
  ChatMessageContentImage,
  ChatMessageImagePending,
  ChatMessageButton,
  ChatMessageButtonsWrapper,
} from "../ChatMessage/styled";

import {
  deleteMessage,
  setImageViewerImage,
} from "../../../../store/slice/room.slice";

import { RootState } from "../../../../store";
import { Message } from "../../../../types/Message";

import { socket } from "../../../../shared/socket/SocketProvider";

interface PropTypes {
  message: Message;
}

const ChatMessageImage: FC<PropTypes> = ({ message }: PropTypes) => {
  const dispatch = useDispatch();
  const roomId = useSelector((state: RootState) => state.room.id);
  const [isSender, setIsSender] = useState(false);

  useEffect(() => {
    setIsSender(message.senderId === socket.id);
  }, [message.senderId]);

  function displayImage(): void {
    dispatch(setImageViewerImage(message.content));
  }

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
        data-tip={`${new Date(message.time).toLocaleDateString()} ${new Date(
          message.time
        ).toLocaleTimeString()}`}
        isImageContent
        isSender={isSender}
      >
        <ChatMessageSender isSender={isSender}>
          {message.sender}
        </ChatMessageSender>
        <ChatMessageContentImage src={message.content} onClick={displayImage} />
        {message.status === "pending" && (
          <ChatMessageImagePending>
            <Loader
              type="ThreeDots"
              color="rgba(255, 255, 255, 0.8)"
              height={30}
              width={30}
            />
          </ChatMessageImagePending>
        )}
        {message.status === "error" && (
          <ChatMessageImagePending>
            <AlertCircle size={28} color="red" />
          </ChatMessageImagePending>
        )}
      </ChatMessageContentWrapper>
      <Tooltip effect="solid" place="top" />
      <ChatMessageButtonsWrapper isSender={isSender}>
        {isSender && message.status === "ok" && message.type !== "removed" && (
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

export default memo(ChatMessageImage);
