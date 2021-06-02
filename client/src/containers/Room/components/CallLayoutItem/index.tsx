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
} from "./styled";

import { User } from "../../../../types/User";
import { RootState } from "../../../../store";
import { socket } from "../../../../shared/socket/SocketProvider";
import { stunUrl } from "../../../../constants/url";

interface PropTypes {
  user: User;
  callerAudioStream: MediaStream;
  callerVideoStream: MediaStream | undefined;
  callerVideoTrack: MediaStreamTrack | undefined;
}

const CallLayoutItem: FC<PropTypes> = ({
  user,
  callerAudioStream,
  callerVideoStream,
  callerVideoTrack,
}: PropTypes) => {
  const roomId = useSelector((state: RootState) => state.room.id);

  const { ref, width = 0, height = 0 } = useResize();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream>();
  const [peer, setPeer] = useState<Instance>();

  useEffect(() => {
    let initialPeer: Instance;
    if (user.isNewMember) {
      initialPeer = new Peer({
        initiator: false,
        trickle: false,
        config: {
          iceServers: [{ urls: stunUrl }],
        },
        stream: callerAudioStream,
      });
    } else {
      initialPeer = new Peer({
        initiator: true,
        trickle: false,
        config: {
          iceServers: [{ urls: stunUrl }],
        },
        stream: callerAudioStream,
      });
    }
    setPeer(initialPeer);

    initialPeer.on("signal", (signal: SignalData) => {
      socket.emit("ready-call-audio", {
        roomId,
        signal,
        userId: user.id,
      });
    });
  }, [callerAudioStream, roomId, user.id, user.isNewMember]);

  // =========================== Audio call ===========================
  useEffect((): any => {
    if (peer) {
      socket.on(`new-user-ready-call-audio_${user.id}`, ({ signal }) => {
        peer.signal(signal);

        peer.on("stream", (stream) => {
          setRemoteStream(stream);
        });
      });
      return () => socket.off(`new-user-ready-call-audio_${user.id}`);
    }
    return null;
  }, [peer, user.id]);

  // =========================== Video call ===========================
  useEffect(() => {
    if (peer) {
      if (callerVideoStream) {
        peer.addTrack(callerVideoStream.getVideoTracks()[0], callerAudioStream);
      } else {
        peer.removeTrack(
          callerVideoTrack as MediaStreamTrack,
          callerAudioStream
        );
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callerVideoStream, roomId, user.id]);

  useEffect(() => {
    if (remoteStream && videoRef.current && !videoRef.current.srcObject) {
      videoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

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
        <CallLayoutItemVideo controls={false} ref={videoRef} autoPlay />
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
