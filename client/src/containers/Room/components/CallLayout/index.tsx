import { useState, FC, useEffect } from "react";
import { useSelector } from "react-redux";
import Peer from "peerjs";

import { CallLayoutWrapper } from "./styled";

import CallLayoutItem from "../CallLayoutItem";
import CallLayoutItemCaller from "../CallLayoutItemCaller";
import ControlBar from "../ControlBar";

import { RootState } from "../../../../store";

import { calLayout, Layout } from "../../../../shared/cal-layout/cal-layout";
import { socket } from "../../../../shared/socket/SocketProvider";

const CallLayout: FC = () => {
  const users = useSelector((state: RootState) => state.room.users);
  const roomId = useSelector((state: RootState) => state.room.id);
  const status = useSelector((state: RootState) => state.room.status);
  const [layout, setLayout] = useState<Layout>({ columns: 0, rows: 0 });
  const [showControlBar, setShowControlBar] = useState<boolean>(false);
  const [audioStream, setAudioStream] = useState<MediaStream>();
  const [audioPeer, setAudioPeer] = useState<Peer>();

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

  useEffect(() => {
    setAudioPeer(new Peer(`audio_${socket.id}`));
    socket.emit("ready-call-audio", {
      roomId,
    });
  }, [roomId]);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: false, audio: true })
      .then((data) => {
        data.getAudioTracks().forEach((track) => {
          track.enabled = false;
        });
        setAudioStream(data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (status.audio && audioStream) {
      audioStream.getAudioTracks().forEach((track) => {
        track.enabled = true;
      });
    }
    if (!status.audio && audioStream) {
      audioStream.getAudioTracks().forEach((track) => {
        track.enabled = false;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status.audio]);

  function changeControlBar(): void {
    setShowControlBar(true);
  }

  if (audioPeer && audioStream)
    return (
      <CallLayoutWrapper layout={layout} onMouseMove={changeControlBar}>
        {users.map((user, index) =>
          user.id === socket.id ? (
            <CallLayoutItemCaller user={user} key={`user_${index.toFixed()}`} />
          ) : (
            <CallLayoutItem
              callerAudioStream={audioStream}
              user={user}
              audioPeer={audioPeer}
              key={`user_${index.toFixed()}`}
            />
          )
        )}
        <ControlBar showControlBar={showControlBar} />
      </CallLayoutWrapper>
    );
  return <div />;
};

export default CallLayout;
