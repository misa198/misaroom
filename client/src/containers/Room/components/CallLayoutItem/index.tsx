import { FC, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useResize from "use-resize-observer";
import Tooltip from "react-tooltip";
import { Mic, MicOff } from "react-feather";

import {
  CallLayoutItemWrapper,
  CallLayoutItemDetails,
  CallLayoutItemAvatarVoiceDetect,
  CallLayoutItemAvatar,
  CallLayoutItemAvatarImg,
  CallLayoutItemNameWrapper,
  CallLayoutItemName,
  CallLayoutItemNameMic,
  CallLayoutItemVideoWrapper,
  CallLayoutItemVideo,
} from "./styled";

import { socket } from "../../../../shared/socket/SocketProvider";

import { RootState } from "../../../../store";
import { User } from "../../../../types/User";

interface PropTypes {
  user: User;
}

const CallLayoutItem: FC<PropTypes> = ({ user }: PropTypes) => {
  const { ref, width = 0, height = 0 } = useResize();
  const [stream, setStream] = useState<MediaStream>();
  const videoRef = useRef<HTMLVideoElement>(null);

  const status = useSelector((state: RootState) => state.room.status);

  useEffect(() => {
    if (socket.id === user.id) {
      navigator.mediaDevices
        .getUserMedia({ video: false, audio: true })
        .then((data) => {
          data.getAudioTracks().forEach((track) => {
            data.removeTrack(track);
          });
          setStream(data);
        });
    }
  }, [user.id]);

  useEffect(() => {
    if (socket.id === user.id) {
      if (status.audio && stream) {
        navigator.mediaDevices.getUserMedia({ audio: true }).then((st) => {
          st.getAudioTracks().forEach((track) => stream?.addTrack(track));
        });
      }
      if (!status.audio && stream) {
        stream.getAudioTracks().forEach((track) => {
          stream.removeTrack(track);
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status.audio, user.id]);

  useEffect(() => {
    if (socket.id === user.id) {
      if (status.camera && stream) {
        navigator.mediaDevices.getUserMedia({ video: true }).then((st) => {
          st.getVideoTracks().forEach((track) => stream?.addTrack(track));
        });
      }
      if (!status.camera && stream) {
        stream.getVideoTracks().forEach((track) => {
          track.stop();
          stream.removeTrack(track);
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status.camera, user.id]);

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <CallLayoutItemWrapper ref={ref}>
      {socket.id === user.id ? (
        <CallLayoutItemDetails video={status.camera}>
          <CallLayoutItemAvatarVoiceDetect>
            <CallLayoutItemAvatar width={width} height={height}>
              <CallLayoutItemAvatarImg src={user.avatar} />
            </CallLayoutItemAvatar>
          </CallLayoutItemAvatarVoiceDetect>
        </CallLayoutItemDetails>
      ) : (
        <CallLayoutItemDetails video={stream?.getVideoTracks().length}>
          <CallLayoutItemAvatarVoiceDetect>
            <CallLayoutItemAvatar width={width} height={height}>
              <CallLayoutItemAvatarImg src={user.avatar} />
            </CallLayoutItemAvatar>
          </CallLayoutItemAvatarVoiceDetect>
        </CallLayoutItemDetails>
      )}

      {socket.id === user.id ? (
        <CallLayoutItemVideoWrapper video={status.camera}>
          <CallLayoutItemVideo autoPlay controls={false} ref={videoRef} muted />
        </CallLayoutItemVideoWrapper>
      ) : (
        <CallLayoutItemVideoWrapper video={stream?.getVideoTracks().length}>
          <CallLayoutItemVideo autoPlay controls={false} ref={videoRef} />
        </CallLayoutItemVideoWrapper>
      )}

      <CallLayoutItemNameWrapper data-tip={user.name}>
        <CallLayoutItemName>{user.name}</CallLayoutItemName>
        <CallLayoutItemNameMic>
          {stream?.getAudioTracks().length ? (
            <Mic size={14} />
          ) : (
            <MicOff size={14} />
          )}
        </CallLayoutItemNameMic>
      </CallLayoutItemNameWrapper>
      <Tooltip place="top" type="dark" effect="solid" />
    </CallLayoutItemWrapper>
  );
};

export default CallLayoutItem;
