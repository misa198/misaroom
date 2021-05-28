import { FC, memo } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../../../store";

import { ChatWrapper } from "./styled";

const Chat: FC = () => {
  const showChat = useSelector(
    (state: RootState) => state.room.status.showChat
  );

  return <ChatWrapper showChat={showChat} />;
};

export default memo(Chat);
