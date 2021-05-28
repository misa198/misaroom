import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tooltip from "react-tooltip";
import {
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Phone,
  Monitor,
  MessageSquare,
} from "react-feather";

import {
  ControlBarWrapper,
  ControlBarContainer,
  ControlBarButton,
} from "./styled";

import { RootState } from "../../../../store";

import {
  changeChatStatus as changeChatStatusAction,
  turnOffCam,
  turnOnCam,
  turnOffMic,
  turnOnMic,
} from "../../../../store/slice/room.slice";

interface PropTypes {
  showControlBar: boolean;
}

const ControlBar: FC<PropTypes> = ({ showControlBar }: PropTypes) => {
  const dispatch = useDispatch();
  const status = useSelector((state: RootState) => state.room.status);

  function changeChatStatus(): void {
    dispatch(changeChatStatusAction());
  }

  function endRoom(): void {
    window.location.href = "/";
  }

  function changeMicStatus(): void {
    if (status.audio) {
      dispatch(turnOffMic());
    } else {
      dispatch(turnOnMic());
    }
  }

  function changeCameraStatus(): void {
    if (status.camera) {
      dispatch(turnOffCam());
    } else {
      dispatch(turnOnCam());
    }
  }

  return (
    <ControlBarWrapper showControlBar={showControlBar}>
      <ControlBarContainer>
        <ControlBarButton active={false} data-tip="Share screen">
          <Monitor />
        </ControlBarButton>
        <Tooltip place="top" type="dark" effect="solid" />
        <ControlBarButton
          active={status.camera}
          data-tip="Camera"
          onClick={changeCameraStatus}
        >
          {status.camera ? <Camera /> : <CameraOff />}
        </ControlBarButton>
        <Tooltip place="top" type="dark" effect="solid" />
        <ControlBarButton
          active={status.audio}
          data-tip="Microphone"
          onClick={changeMicStatus}
        >
          {status.audio ? <Mic /> : <MicOff />}
        </ControlBarButton>
        <Tooltip place="top" type="dark" effect="solid" />
        <ControlBarButton
          active={status.showChat}
          data-tip="Chat"
          onClick={changeChatStatus}
        >
          <MessageSquare />
        </ControlBarButton>
        <Tooltip place="top" type="dark" effect="solid" />
        <ControlBarButton active={false} call data-tip="End" onClick={endRoom}>
          <Phone />
        </ControlBarButton>
        <Tooltip place="top" type="dark" effect="solid" />
      </ControlBarContainer>
    </ControlBarWrapper>
  );
};

export default ControlBar;
