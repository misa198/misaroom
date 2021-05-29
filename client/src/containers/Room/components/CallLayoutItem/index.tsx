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
} from "./styled";

import { socket } from "../../../../shared/socket/SocketProvider";

import { User } from "../../../../types/User";

interface PropTypes {
  user: User;
  peer: Peer;
  callerStream: MediaStream;
}

const CallLayoutItem: FC<PropTypes> = ({
  user,
  peer,
  callerStream,
}: PropTypes) => {
  const { ref, width = 0, height = 0 } = useResize();
  const [stream, setStream] = useState<MediaStream>();
  const [call, setCall] = useState<Peer.MediaConnection>();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    }
  }, [stream]);

  useEffect((): any => {
    socket.on(`new-user-ready-call_${user.id}`, () => {
      setCall(peer.call(user.id, callerStream));
    });

    return () => socket.off(`new-user-ready-call>${user.id}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [peer, user.id]);

  useEffect(() => {
    if (call) {
      call.on("stream", (remoteStream) => {
        setStream(remoteStream);
      });
    }
  }, [call]);

  useEffect(() => {
    peer.on("call", (_call) => {
      _call.answer(callerStream);
      _call.on("stream", (remoteStream) => {
        setStream(remoteStream);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [peer]);

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
        <CallLayoutItemVideo controls={false} ref={videoRef} />
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
