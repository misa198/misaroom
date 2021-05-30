import { FC } from "react";
import { useDispatch } from "react-redux";
import { X } from "react-feather";

import { changeChatStatus } from "../../../../store/slice/room.slice";

import {
  ChatHeaderWrapper,
  ChatHeaderTitle,
  ChatHeaderCloseButton,
} from "./styled";

const ChatHeader: FC = () => {
  const dispatch = useDispatch();

  function switchChat(): void {
    dispatch(changeChatStatus());
  }

  return (
    <ChatHeaderWrapper>
      <ChatHeaderTitle>Message</ChatHeaderTitle>
      <ChatHeaderCloseButton onClick={switchChat}>
        <X />
      </ChatHeaderCloseButton>
    </ChatHeaderWrapper>
  );
};

export default ChatHeader;
