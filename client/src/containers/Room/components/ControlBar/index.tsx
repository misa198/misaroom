import { FC } from "react";
import Tooltip from "react-tooltip";
import { Mic, Camera, Phone, Monitor, MessageSquare } from "react-feather";

import {
  ControlBarWrapper,
  ControlBarContainer,
  ControlBarButton,
} from "./styled";

interface PropTypes {
  showControlBar: boolean;
}

const ControlBar: FC<PropTypes> = ({ showControlBar }: PropTypes) => {
  return (
    <ControlBarWrapper showControlBar={showControlBar}>
      <ControlBarContainer>
        <ControlBarButton active={false} data-tip="Share screen">
          <Monitor />
        </ControlBarButton>
        <Tooltip place="top" type="dark" effect="solid" />
        <ControlBarButton active={false} data-tip="Camera">
          <Camera />
        </ControlBarButton>
        <Tooltip place="top" type="dark" effect="solid" />
        <ControlBarButton active data-tip="Microphone">
          <Mic />
        </ControlBarButton>
        <Tooltip place="top" type="dark" effect="solid" />
        <ControlBarButton active data-tip="Chat">
          <MessageSquare />
        </ControlBarButton>
        <Tooltip place="top" type="dark" effect="solid" />
        <ControlBarButton active={false} call data-tip="End">
          <Phone />
        </ControlBarButton>
        <Tooltip place="top" type="dark" effect="solid" />
      </ControlBarContainer>
    </ControlBarWrapper>
  );
};

export default ControlBar;
