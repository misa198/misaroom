import { FC, useState } from "react";
import Tooltip from "react-tooltip";

import {
  ChatMessageWrapper,
  ChatMessageAvatarWrapper,
  ChatMessageAvatar,
  ChatMessageSender,
  ChatMessageContentWrapper,
  ChatMessageContentImage,
} from "../ChatMessage/styled";

const ChatMessageImage: FC = () => {
  const [isSender, setIsSender] = useState(false);

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
        <ChatMessageContentImage src="https://picsum.photos/seed/picsum/700/400" />
      </ChatMessageContentWrapper>
      <Tooltip effect="solid" place="top" />
    </ChatMessageWrapper>
  );
};

export default ChatMessageImage;
