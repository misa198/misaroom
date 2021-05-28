import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tooltip from "react-tooltip";
import { Mic, Camera, Phone, Monitor, MessageSquare } from "react-feather";

import {
  ControlBarWrapper,
  ControlBarContainer,
  ControlBarButton,
} from "./styled";

import { RootState } from "../../../../store";

import { changeChatStatus as changeChatStatusAction } from "../../../../store/slice/room.slice";

interface PropTypes {
  showControlBar: boolean;
}

const ControlBar: FC<PropTypes> = ({ showControlBar }: PropTypes) => {
  const dispatch = useDispatch();
  const showChat = useSelector(
    (state: RootState) => state.room.status.showChat
  );

  function changeChatStatus(): void {
    dispatch(changeChatStatusAction());
  }

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
        <ControlBarButton
          active={showChat}
          data-tip="Chat"
          onClick={changeChatStatus}
        >
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
