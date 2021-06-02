import { useState, FC, useEffect, memo } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { CallLayoutWrapper } from "./styled";

import CallLayoutItem from "../CallLayoutItem";
import CallLayoutItemCaller from "../CallLayoutItemCaller";
import CallLayoutItemScreenSharing from "../CallLayoutItemScreenSharing";
import ControlBar from "../ControlBar";

import { RootState } from "../../../../store";
import {
  changeCallingStatus,
  changeSharingScreenStatus,
} from "../../../../store/slice/room.slice";

import { calLayout, Layout } from "../../../../shared/cal-layout/cal-layout";
import { socket } from "../../../../shared/socket/SocketProvider";

const CallLayout: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.room.users);
  const status = useSelector((state: RootState) => state.room.status);
  const calling = useSelector((state: RootState) => state.room.calling);

  const [dirty, setDirty] = useState<boolean>(false);
  const [layout, setLayout] = useState<Layout>({ columns: 0, rows: 0 });
  const [showControlBar, setShowControlBar] = useState<boolean>(false);
  const [audioStream, setAudioStream] = useState<MediaStream>();
  const [videoStream, setVideoStream] = useState<MediaStream>();
  const [videoTrack, setVideoTrack] = useState<MediaStreamTrack>();

  useEffect(() => {
    if (status.sharingScreen.userId) {
      setLayout(calLayout(users.length + 1));
    } else setLayout(calLayout(users.length));
  }, [status.sharingScreen.userId, users.length]);

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
      } else if (videoTrack && videoStream) {
        videoStream.getTracks().forEach((tracks) => tracks.stop());
        audioStream.removeTrack(videoTrack);
        setVideoStream(undefined);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status.camera]);

  useEffect(() => {
    if (!calling && dirty) {
      if (audioStream) audioStream.getTracks().forEach((track) => track.stop());
      if (videoStream) videoStream.getTracks().forEach((track) => track.stop());
      history.push({
        pathname: "/",
        state: {
          valid: true,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calling]);

  useEffect(() => {
    if (!dirty) {
      setDirty(true);
      dispatch(changeCallingStatus(true));
    }
  }, [dirty, dispatch]);

  useEffect((): any => {
    socket.on("request-sharing-screen", ({ userId }) => {
      dispatch(
        changeSharingScreenStatus({
          userId,
          status: "pending",
        })
      );
    });

    return () => socket.off("request-sharing-screen");
  }, [dispatch]);

  useEffect((): any => {
    socket.on("stop-sharing-screen", () => {
      dispatch(
        changeSharingScreenStatus({
          userId: undefined,
          status: "unset",
        })
      );
    });

    return () => socket.off("stop-sharing-screen");
  }, [dispatch]);

  if (audioStream)
    return (
      <CallLayoutWrapper layout={layout} onMouseMove={changeControlBar}>
        {status.sharingScreen.userId && (
          <CallLayoutItemScreenSharing
            userId={status.sharingScreen.userId}
            key="sharing_screen"
          />
        )}
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
