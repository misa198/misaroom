import { FC, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useResize from "use-resize-observer";
import Tooltip from "react-tooltip";
import { Mic, MicOff } from "react-feather";
import Peer, { Instance, SignalData } from "simple-peer";

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

import { User } from "../../../../types/User";
import { RootState } from "../../../../store";
import { socket } from "../../../../shared/socket/SocketProvider";

interface PropTypes {
  user: User;
  callerAudioStream: MediaStream;
}

const CallLayoutItem: FC<PropTypes> = ({
  user,
  callerAudioStream,
}: PropTypes) => {
  const roomId = useSelector((state: RootState) => state.room.id);

  const { ref, width = 0, height = 0 } = useResize();
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoForAudioRef = useRef<HTMLVideoElement>(null);
  const [audioStream, setAudioStream] = useState<MediaStream>();
  const [peer, setPeer] = useState<Instance>();

  useEffect(() => {
    const initialPeer = new Peer({
      initiator: true,
      trickle: false,
      stream: callerAudioStream,
    });

    setPeer(initialPeer);
    initialPeer.on("signal", (signal: SignalData) => {
      socket.emit("ready-call-audio", {
        roomId,
        signal,
        userId: user.id,
      });
    });
  }, [callerAudioStream, roomId, user.id]);

  useEffect((): any => {
    if (peer) {
      socket.on(`new-user-ready-call-audio_${user.id}`, ({ signal }) => {
        peer.signal(signal);

        peer.on("stream", (stream) => {
          setAudioStream(stream);
        });
      });
      return () => socket.off(`new-user-ready-call-audio_${user.id}`);
    }
    return null;
  }, [peer, user.id]);

  useEffect(() => {
    if (
      audioStream &&
      videoForAudioRef.current &&
      !videoForAudioRef.current.srcObject
    ) {
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
        <CallLayoutItemVideo controls ref={videoRef} autoPlay />
        <CallLayoutItemVideoForAudioTrack
          ref={videoForAudioRef}
          controls={false}
        />
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
