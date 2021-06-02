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
  const [videoTrack, setVideoTrack] = useState<MediaStreamTrack>();
  const [videoStream, setVideoStream] = useState<MediaStream>();

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

  useEffect(() => {
    if (audioStream) {
      if (status.camera) {
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: false })
          .then((stream) => {
            setVideoStream(stream);
            setVideoTrack(stream.getVideoTracks()[0]);
            audioStream.addTrack(stream.getVideoTracks()[0]);
          });
      } else if (status.shareScreen) {
        const mediaDevices = navigator.mediaDevices as any;
        mediaDevices
          .getDisplayMedia({
            video: true,
            audio: true,
          })
          .then((stream: MediaStream) => {
            setVideoStream(stream);
            setVideoTrack(stream.getVideoTracks()[0]);
            audioStream.addTrack(stream.getVideoTracks()[0]);
          });
      } else if (videoTrack && videoStream) {
        videoStream.getTracks().forEach((tracks) => tracks.stop());
        audioStream.removeTrack(videoTrack);
        setVideoStream(undefined);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status.camera, status.shareScreen]);

  if (audioStream)
    return (
      <CallLayoutWrapper layout={layout} onMouseMove={changeControlBar}>
        {users.map((user, index) =>
          user.id === socket.id ? (
            <CallLayoutItemCaller
              videoStream={videoStream}
              user={user}
              key={`user_${index.toFixed()}`}
            />
          ) : (
            <CallLayoutItem
              callerAudioStream={audioStream}
              callerVideoStream={videoStream}
              callerVideoTrack={videoTrack}
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
