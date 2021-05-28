import { FC, useState } from "react";
import useResize from "use-resize-observer";
import Tooltip from "react-tooltip";
import { Mic } from "react-feather";

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

const CallLayoutItem: FC = () => {
  const { ref, width = 0, height = 0 } = useResize();
  const [video, setVideo] = useState(false);

  return (
    <CallLayoutItemWrapper ref={ref}>
      <CallLayoutItemDetails video={video}>
        <CallLayoutItemAvatarVoiceDetect>
          <CallLayoutItemAvatar width={width} height={height}>
            <CallLayoutItemAvatarImg />
          </CallLayoutItemAvatar>
        </CallLayoutItemAvatarVoiceDetect>
      </CallLayoutItemDetails>

      <CallLayoutItemVideoWrapper video={video}>
        <CallLayoutItemVideo
          loop
          controls={false}
          src="http://vjs.zencdn.net/v/oceans.mp4"
        />
      </CallLayoutItemVideoWrapper>
      <CallLayoutItemNameWrapper data-tip="Thanh Vu">
        <CallLayoutItemName>Thanh Vu</CallLayoutItemName>
        <CallLayoutItemNameMic>
          <Mic size={14} />
        </CallLayoutItemNameMic>
      </CallLayoutItemNameWrapper>
      <Tooltip place="top" type="dark" effect="solid" />
    </CallLayoutItemWrapper>
  );
};

export default CallLayoutItem;
