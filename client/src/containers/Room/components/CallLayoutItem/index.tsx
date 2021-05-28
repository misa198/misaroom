import { FC } from "react";
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
} from "./styled";

const CallLayoutItem: FC = () => {
  const { ref, width = 0, height = 0 } = useResize();

  return (
    <CallLayoutItemWrapper ref={ref}>
      <CallLayoutItemDetails>
        <CallLayoutItemAvatarVoiceDetect>
          <CallLayoutItemAvatar width={width} height={height}>
            <CallLayoutItemAvatarImg />
          </CallLayoutItemAvatar>
        </CallLayoutItemAvatarVoiceDetect>
      </CallLayoutItemDetails>
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
