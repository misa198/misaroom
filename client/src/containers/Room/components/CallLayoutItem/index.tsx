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
  callerVideoStream: MediaStream | undefined;
}

const CallLayoutItem: FC<PropTypes> = ({
  user,
  callerAudioStream,
  callerVideoStream,
}: PropTypes) => {
  const roomId = useSelector((state: RootState) => state.room.id);

  const { ref, width = 0, height = 0 } = useResize();
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoForAudioRef = useRef<HTMLVideoElement>(null);
  const [audioStream, setAudioStream] = useState<MediaStream>();
  const [videoStream, setVideoStream] = useState<MediaStream>();
  const [audioPeer, setAudioPeer] = useState<Instance>();
  const [receivedVideoPeer, setReceivedVideoPeer] = useState<Instance>();

  useEffect(() => {
    const initialAudioPeer = new Peer({
      initiator: true,
      trickle: false,
      stream: callerAudioStream,
    });
    setAudioPeer(initialAudioPeer);

    const initialReceivedVideoPeer = new Peer({
      initiator: false,
      trickle: false,
    });
    setReceivedVideoPeer(initialReceivedVideoPeer);

    initialAudioPeer.on("signal", (signal: SignalData) => {
      socket.emit("ready-call-audio", {
        roomId,
        signal,
        userId: user.id,
      });
    });
  }, [callerAudioStream, roomId, user.id]);

  // =========================== Audio call ===========================
  useEffect((): any => {
    if (audioPeer) {
      socket.on(`new-user-ready-call-audio_${user.id}`, ({ signal }) => {
        audioPeer.signal(signal);

        audioPeer.on("stream", (stream) => {
          setAudioStream(stream);
        });
      });
      return () => socket.off(`new-user-ready-call-audio_${user.id}`);
    }
    return null;
  }, [audioPeer, user.id]);

  // =========================== Video call ===========================
  useEffect(() => {
    if (callerVideoStream) {
      const initialPeer = new Peer({
        initiator: true,
        trickle: false,
        stream: callerVideoStream,
      });

      initialPeer.on("signal", (signal: SignalData) => {
        socket.emit("ready-call-video", {
          roomId,
          signal,
          userId: user.id,
        });
      });
    }
  }, [callerVideoStream, roomId, user.id]);

  useEffect((): any => {
    if (user.camera && receivedVideoPeer) {
      socket.on(`new-user-ready-call-video_${user.id}`, ({ signal }) => {
        receivedVideoPeer.signal(signal);

        receivedVideoPeer.on("stream", (stream) => {
          setVideoStream(stream);
        });
      });
      return () => socket.off(`new-user-ready-call-video_${user.id}`);
    }
    return null;
  }, [receivedVideoPeer, user.id, user.camera]);

  useEffect(() => {
    if (
      audioStream &&
      videoForAudioRef.current &&
      !videoForAudioRef.current.srcObject
    ) {
      videoForAudioRef.current.srcObject = audioStream;
    }
  }, [audioStream]);

  useEffect(() => {
    if (videoStream) {
      if (videoRef.current && !videoRef.current.srcObject) {
        videoRef.current.srcObject = videoStream;
      }
    } else if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoStream]);

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
          autoPlay
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
