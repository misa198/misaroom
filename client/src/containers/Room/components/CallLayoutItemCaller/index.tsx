import { FC, useEffect, useRef } from "react";
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
} from "../CallLayoutItem/styled";

import { RootState } from "../../../../store";
import { User } from "../../../../types/User";

interface PropTypes {
  user: User;
  stream: MediaStream;
}

const CallLayoutItemCaller: FC<PropTypes> = ({ user, stream }: PropTypes) => {
  const { ref, width = 0, height = 0 } = useResize();
  const videoRef = useRef<HTMLVideoElement>(null);

  const status = useSelector((state: RootState) => state.room.status);

  useEffect(() => {
    if (status.audio && stream) {
      stream.getAudioTracks().forEach((track) => {
        track.enabled = true;
      });
    }
    if (!status.audio && stream) {
      stream.getAudioTracks().forEach((track) => {
        track.enabled = false;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status.audio]);

  useEffect(() => {
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status.camera]);

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    }
  }, [stream]);

  return (
    <CallLayoutItemWrapper ref={ref}>
      <CallLayoutItemDetails video={status.camera}>
        <CallLayoutItemAvatarVoiceDetect>
          <CallLayoutItemAvatar width={width} height={height}>
            <CallLayoutItemAvatarImg src={user.avatar} />
          </CallLayoutItemAvatar>
        </CallLayoutItemAvatarVoiceDetect>
      </CallLayoutItemDetails>

      <CallLayoutItemVideoWrapper video={status.camera}>
        <CallLayoutItemVideo controls={false} ref={videoRef} muted />
      </CallLayoutItemVideoWrapper>

      <CallLayoutItemNameWrapper data-tip={user.name}>
        <CallLayoutItemName>{user.name}</CallLayoutItemName>
        <CallLayoutItemNameMic>
          {status.audio ? <Mic size={14} /> : <MicOff size={14} />}
        </CallLayoutItemNameMic>
      </CallLayoutItemNameWrapper>
      <Tooltip place="top" type="dark" effect="solid" />
    </CallLayoutItemWrapper>
  );
};

export default CallLayoutItemCaller;
