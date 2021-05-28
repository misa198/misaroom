import { FC, useState } from "react";
import useResize from "use-resize-observer";
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
  const [video, setVideo] = useState(true);

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
          autoPlay
          loop
          src="http://vjs.zencdn.net/v/oceans.mp4"
        />
      </CallLayoutItemVideoWrapper>
      <CallLayoutItemNameWrapper>
        <CallLayoutItemName>Misa198</CallLayoutItemName>
        <CallLayoutItemNameMic>
          <Mic size={14} />
        </CallLayoutItemNameMic>
      </CallLayoutItemNameWrapper>
    </CallLayoutItemWrapper>
  );
};

export default CallLayoutItem;
