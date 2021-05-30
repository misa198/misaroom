import { FC, memo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useSound from "use-sound";

import { RootState } from "../../../../store";

import { ChatWrapper, ChatContainer } from "./styled";

import ChatHeader from "../ChatHeader";
import ChatConversation from "../ChatConversation";
import ChatInput from "../ChatInput";
import ChatImageViewer from "../ChatImageViewer";

import {
  insertMessage,
  increaseNotification,
  deleteMessage,
} from "../../../../store/slice/room.slice";

import { socket } from "../../../../shared/socket/SocketProvider";

import messageNotificationSound from "../../../../assets/audios/message-notification.mp3";

const Chat: FC = () => {
  const dispatch = useDispatch();
  const showChat = useSelector(
    (state: RootState) => state.room.status.showChat
  );
  const messages = useSelector((state: RootState) => state.room.messages);
  const [play] = useSound(messageNotificationSound);

  useEffect((): any => {
    socket.on("new-message", (message) => {
      if (!showChat) play();
      dispatch(insertMessage(message));
      dispatch(increaseNotification());
    });

    return () => socket.off("new-message");
  }, [dispatch, play, showChat]);

  useEffect((): any => {
    socket.on("remove-message", (res) => {
      const foundMessage = messages.find((m) => m.id === res.messageId);
      if (foundMessage && foundMessage.senderId === res.userId) {
        dispatch(deleteMessage(res.messageId));
      }
    });

    return () => socket.off("remove-message");
  }, [dispatch, messages, play, showChat]);

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
