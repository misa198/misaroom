import { useState, FC, useEffect } from "react";
import { useSelector } from "react-redux";

import Peer, { Instance } from "simple-peer";
import { CallLayoutWrapper } from "./styled";

import CallLayoutItem from "../CallLayoutItem";
import CallLayoutItemCaller from "../CallLayoutItemCaller";
import ControlBar from "../ControlBar";

import { RootState } from "../../../../store";

import { calLayout, Layout } from "../../../../shared/cal-layout/cal-layout";
import { socket } from "../../../../shared/socket/SocketProvider";

const CallLayout: FC = () => {
  const users = useSelector((state: RootState) => state.room.users);

  const [layout, setLayout] = useState<Layout>({ columns: 0, rows: 0 });
  const [showControlBar, setShowControlBar] = useState<boolean>(false);
  const [audioPeer, setAudioPeer] = useState<Instance>();
  const roomId = useSelector((state: RootState) => state.room.id);

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
      .getUserMedia({ audio: true, video: false })
      .then((stream) => {
        stream.getAudioTracks().forEach((track) => {
          track.enabled = false;
        });
        const initialAudioPeer = new Peer({
          initiator: true,
          trickle: false,
          config: {
            iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
          },
          stream,
        });

        setAudioPeer(initialAudioPeer);

        initialAudioPeer.on("signal", (signal) => {
          socket.emit("ready-call-audio", { roomId, signal });
        });
      });
  }, [roomId]);

  if (audioPeer)
    return (
      <CallLayoutWrapper layout={layout} onMouseMove={changeControlBar}>
        {users.map((user, index) =>
          user.id === socket.id ? (
            <CallLayoutItemCaller user={user} key={`user_${index.toFixed()}`} />
          ) : (
            <CallLayoutItem
              callerAudioPeer={audioPeer}
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

export default CallLayout;
