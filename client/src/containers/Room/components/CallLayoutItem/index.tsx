import { FC, useEffect, useRef, useState } from "react";
import { Instance } from "simple-peer";
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
  CallLayoutItemVideoForAudioTrack,
} from "./styled";

import { socket } from "../../../../shared/socket/SocketProvider";

import { User } from "../../../../types/User";

interface PropTypes {
  user: User;
  callerAudioPeer: Instance;
}

const CallLayoutItem: FC<PropTypes> = ({
  user,
  callerAudioPeer,
}: PropTypes) => {
  const { ref, width = 0, height = 0 } = useResize();
  const videoForAudioRef = useRef<HTMLVideoElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [audioStream, setAudioStream] = useState<MediaStream>();

  useEffect((): any => {
    socket.on(`new-user-ready-call-audio_${user.id}`, ({ signal }) => {
      callerAudioPeer.signal(signal);
    });
  }, [callerAudioPeer, user.id]);

  useEffect(() => {
    callerAudioPeer.on("stream", (stream) => {
      setAudioStream(stream);
    });
  }, [callerAudioPeer]);

  useEffect(() => {
    if (audioStream && videoRef.current && !videoRef.current.srcObject) {
      videoRef.current.srcObject = audioStream;
      videoRef.current.play();
    }
  }, [audioStream]);

  return (
    <CallLayoutItemWrapper ref={ref}>
      <CallLayoutItemDetails video={user.camera}>
        <CallLayoutItemAvatarVoiceDetect>
          <CallLayoutItemAvatar width={width} height={height}>
            <CallLayoutItemAvatarImg src={user.avatar} />
          </CallLayoutItemAvatar>
        </CallLayoutItemAvatarVoiceDetect>
      </CallLayoutItemDetails>

      <CallLayoutItemVideoWrapper video={user.camera}>
        <CallLayoutItemVideo controls ref={videoRef} autoPlay />
        <CallLayoutItemVideoForAudioTrack ref={videoForAudioRef} />
      </CallLayoutItemVideoWrapper>

      <CallLayoutItemNameWrapper data-tip={user.name}>
        <CallLayoutItemName>{user.name}</CallLayoutItemName>
        <CallLayoutItemNameMic>
          {user.mic ? <Mic size={14} /> : <MicOff size={14} />}
        </CallLayoutItemNameMic>
      </CallLayoutItemNameWrapper>
      <Tooltip place="top" type="dark" effect="solid" />
    </CallLayoutItemWrapper>
  );
};

export default CallLayoutItem;
