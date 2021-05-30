import { FC, useState, memo } from "react";
import { useDispatch } from "react-redux";
import Tooltip from "react-tooltip";

import {
  ChatMessageWrapper,
  ChatMessageAvatarWrapper,
  ChatMessageAvatar,
  ChatMessageSender,
  ChatMessageContentWrapper,
  ChatMessageContentImage,
} from "../ChatMessage/styled";

import { setImageViewerImage } from "../../../../store/slice/room.slice";

const ChatMessageImage: FC = () => {
  const dispatch = useDispatch();
  const [isSender, setIsSender] = useState(false);

  function displayImage(): void {
    dispatch(
      setImageViewerImage("https://wallpaperaccess.com/full/138728.jpg")
    );
  }

  return (
    <ChatMessageWrapper isSender={isSender}>
      <ChatMessageAvatarWrapper isSender={isSender}>
        <ChatMessageAvatar src="https://res.cloudinary.com/dumfvnj9f/image/upload/v1622008721/animals/wombat_uk5z9h.png" />
      </ChatMessageAvatarWrapper>
      <ChatMessageContentWrapper
        data-tip={new Date()}
        isImageContent
        isSender={isSender}
      >
        <ChatMessageSender isSender={isSender}>cds</ChatMessageSender>
        <ChatMessageContentImage
          src="https://picsum.photos/seed/picsum/700/400"
          onClick={displayImage}
        />
      </ChatMessageContentWrapper>
      <Tooltip effect="solid" place="top" />
    </ChatMessageWrapper>
  );
};

export default memo(ChatMessageImage);
