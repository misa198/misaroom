import { FC, memo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../../../../store";

import { ChatWrapper, ChatContainer } from "./styled";

import ChatHeader from "../ChatHeader";
import ChatConversation from "../ChatConversation";
import ChatInput from "../ChatInput";
import ChatImageViewer from "../ChatImageViewer";

import {
  insertMessage,
  increaseNotification,
} from "../../../../store/slice/room.slice";
import { socket } from "../../../../shared/socket/SocketProvider";

const Chat: FC = () => {
  const dispatch = useDispatch();
  const showChat = useSelector(
    (state: RootState) => state.room.status.showChat
  );

  useEffect((): any => {
    socket.on("new-message", (message) => {
      dispatch(insertMessage(message));
      dispatch(increaseNotification());
    });

    return () => socket.off("new-message");
  }, [dispatch]);

  return (
    <ChatWrapper showChat={showChat}>
      <ChatContainer>
        <ChatHeader />
        <ChatConversation />
        <ChatInput />
      </ChatContainer>
      <ChatImageViewer />
    </ChatWrapper>
  );
};

export default memo(Chat);
