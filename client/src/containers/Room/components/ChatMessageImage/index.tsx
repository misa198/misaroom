import { FC, useState, memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import Tooltip from "react-tooltip";
import Loader from "react-loader-spinner";

import {
  ChatMessageWrapper,
  ChatMessageAvatarWrapper,
  ChatMessageAvatar,
  ChatMessageSender,
  ChatMessageContentWrapper,
  ChatMessageContentImage,
  ChatMessageImagePending,
} from "../ChatMessage/styled";

import { setImageViewerImage } from "../../../../store/slice/room.slice";

import { Message } from "../../../../types/Message";

import { socket } from "../../../../shared/socket/SocketProvider";

interface PropTypes {
  message: Message;
}

const ChatMessageImage: FC<PropTypes> = ({ message }: PropTypes) => {
  const dispatch = useDispatch();
  const [isSender, setIsSender] = useState(false);

  useEffect(() => {
    setIsSender(message.senderId === socket.id);
  }, [message.senderId]);

  function displayImage(): void {
    dispatch(setImageViewerImage(message.content));
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
        {message.pending && (
          <ChatMessageImagePending>
            <Loader
              type="ThreeDots"
              color="rgba(255, 255, 255, 0.8)"
              height={30}
              width={30}
            />
          </ChatMessageImagePending>
        )}
      </ChatMessageContentWrapper>
      <Tooltip effect="solid" place="top" />
    </ChatMessageWrapper>
  );
};

export default memo(ChatMessageImage);
