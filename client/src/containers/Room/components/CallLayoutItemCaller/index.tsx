import { FC, useRef } from "react";
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
}

const CallLayoutItemCaller: FC<PropTypes> = ({ user }: PropTypes) => {
  const { ref, width = 0, height = 0 } = useResize();
  const videoForAudioRef = useRef<HTMLVideoElement>(null);

  const status = useSelector((state: RootState) => state.room.status);

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
        <CallLayoutItemVideo controls={false} ref={videoForAudioRef} muted />
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
