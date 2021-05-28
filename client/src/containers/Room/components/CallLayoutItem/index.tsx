import { FC, useEffect, useRef, useState } from "react";
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

import { User } from "../../../../types/User";

interface PropTypes {
  user: User;
}

const CallLayoutItem: FC<PropTypes> = ({ user }: PropTypes) => {
  const { ref, width = 0, height = 0 } = useResize();
  const [stream, setStream] = useState<MediaStream>();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (socket.id === user.id) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((data) => {
          setStream(data);
        });
    }
  }, [user.id]);

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <CallLayoutItemWrapper ref={ref}>
      <CallLayoutItemDetails video={stream?.getVideoTracks()[0] != null}>
        <CallLayoutItemAvatarVoiceDetect>
          <CallLayoutItemAvatar width={width} height={height}>
            <CallLayoutItemAvatarImg src={user.avatar} />
          </CallLayoutItemAvatar>
        </CallLayoutItemAvatarVoiceDetect>
      </CallLayoutItemDetails>

      <CallLayoutItemVideoWrapper video={stream?.getVideoTracks()[0] != null}>
        <CallLayoutItemVideo
          autoPlay
          controls={false}
          muted={socket.id === user.id}
          ref={videoRef}
        />
      </CallLayoutItemVideoWrapper>
      <CallLayoutItemNameWrapper data-tip={user.name}>
        <CallLayoutItemName>{user.name}</CallLayoutItemName>
        <CallLayoutItemNameMic>
          {stream?.getAudioTracks()[0] ? (
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
