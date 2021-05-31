import { useState, FC, useEffect, memo } from "react";
import { useSelector } from "react-redux";

import { CallLayoutWrapper } from "./styled";

import CallLayoutItem from "../CallLayoutItem";
import CallLayoutItemCaller from "../CallLayoutItemCaller";
import ControlBar from "../ControlBar";

import { RootState } from "../../../../store";

import { calLayout, Layout } from "../../../../shared/cal-layout/cal-layout";
import { socket } from "../../../../shared/socket/SocketProvider";

const CallLayout: FC = () => {
  const users = useSelector((state: RootState) => state.room.users);
  const status = useSelector((state: RootState) => state.room.status);

  const [layout, setLayout] = useState<Layout>({ columns: 0, rows: 0 });
  const [showControlBar, setShowControlBar] = useState<boolean>(false);
  const [audioStream, setAudioStream] = useState<MediaStream>();

  useEffect(() => {
    setLayout(calLayout(users.length));
  }, [users.length]);

  useEffect((): any => {
    if (showControlBar) {
      const id = setTimeout(() => {
        setShowControlBar(false);
      }, 5000);

      return () => clearTimeout(id);
    }
    return null;
  }, [showControlBar]);

  function changeControlBar(): void {
    setShowControlBar(true);
  }

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: false, audio: true })
      .then((stream) => {
        setAudioStream(stream);
      });
  }, []);

  useEffect(() => {
    if (audioStream) {
      audioStream.getAudioTracks().forEach((track) => {
        track.enabled = status.audio;
      });
    }
  }, [audioStream, status.audio]);

  if (audioStream)
    return (
      <CallLayoutWrapper layout={layout} onMouseMove={changeControlBar}>
        {users.map((user, index) =>
          user.id === socket.id ? (
            <CallLayoutItemCaller user={user} key={`user_${index.toFixed()}`} />
          ) : (
            <CallLayoutItem
              callerAudioStream={audioStream}
              user={user}
              key={`user_${index.toFixed()}`}
            />
          )
        )}
        <ControlBar showControlBar={showControlBar} />
      </CallLayoutWrapper>
    );
  return <></>;
};

export default memo(CallLayout);
