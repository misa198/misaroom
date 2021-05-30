import { FC, useState } from "react";
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

const ChatMessage: FC = () => {
  const [isSender, setIsSender] = useState(false);

  return (
    <ChatMessageWrapper isSender={isSender}>
      <ChatMessageAvatarWrapper isSender={isSender}>
        <ChatMessageAvatar src="https://res.cloudinary.com/dumfvnj9f/image/upload/v1622008721/animals/wombat_uk5z9h.png" />
      </ChatMessageAvatarWrapper>
      <ChatMessageContentWrapper
        isSender={isSender}
        data-tip={`${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`}
      >
        <ChatMessageSender isSender={isSender}>cds</ChatMessageSender>
        <ChatMessageContent>csndcksdcnk</ChatMessageContent>
      </ChatMessageContentWrapper>
      <Tooltip effect="solid" place="top" />
      <ChatMessageButtonsWrapper isSender={isSender}>
        <ChatMessageButton data-tip="Delete">
          <Trash size={16} />
        </ChatMessageButton>
        <Tooltip effect="solid" place="top" />
      </ChatMessageButtonsWrapper>
    </ChatMessageWrapper>
  );
};

export default ChatMessage;
