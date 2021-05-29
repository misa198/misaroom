import { FC, useEffect, useRef, useState } from "react";
import useResize from "use-resize-observer";
import Peer from "peerjs";
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
  audioPeer: Peer;
  callerAudioStream: MediaStream;
}

const CallLayoutItem: FC<PropTypes> = ({
  user,
  audioPeer,
  callerAudioStream,
}: PropTypes) => {
  const { ref, width = 0, height = 0 } = useResize();
  const [call, setCall] = useState<Peer.MediaConnection>();
  const videoForAudioRef = useRef<HTMLVideoElement>(null);
  const [audioStream, setAudioStream] = useState<MediaStream>();

  useEffect((): any => {
    socket.on(`new-user-ready-call-audio_${user.id}`, () => {
      setCall(audioPeer.call(`audio_${user.id}`, callerAudioStream));
    });

    return () => socket.off(`new-user-ready-call-audio_${user.id}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioPeer, user.id]);

  useEffect(() => {
    if (call) {
      call.on("stream", (remoteStream) => {
        setAudioStream(remoteStream);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [call]);

  useEffect(() => {
    audioPeer.on("call", (_call) => {
      _call.answer(callerAudioStream);
      _call.on("stream", (remoteStream) => {
        setAudioStream(remoteStream);
      });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioPeer]);

  useEffect(() => {
    if (videoForAudioRef.current && audioStream) {
      videoForAudioRef.current.srcObject = audioStream;
      videoForAudioRef.current.play();
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
        <CallLayoutItemVideo controls={false} />
        <CallLayoutItemVideoForAudioTrack ref={videoForAudioRef} autoPlay />
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
