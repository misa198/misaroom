import { FC, useEffect, memo } from "react";
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
  NotificationAmount,
} from "./styled";

import { RootState } from "../../../../store";

import {
  changeCallingStatus,
  changeChatStatus as changeChatStatusAction,
  changeSharingScreenStatus,
  switchCam,
  switchMic,
  userSwitchDevice,
} from "../../../../store/slice/room.slice";

import { socket } from "../../../../shared/socket/SocketProvider";

import leaveRoomSound from "../../../../assets/audios/leave-room-sound.mp3";

interface PropTypes {
  showControlBar: boolean;
}

const ControlBar: FC<PropTypes> = ({ showControlBar }: PropTypes) => {
  const dispatch = useDispatch();
  const status = useSelector((state: RootState) => state.room.status);
  const roomId = useSelector((state: RootState) => state.room.id);
  const notification = useSelector(
    (state: RootState) => state.room.notification
  );

  useEffect((): any => {
    socket.on("switch-device", (res) => {
      dispatch(userSwitchDevice(res));
    });

    return () => socket.off("switch-device");
  }, [dispatch]);

  function changeChatStatus(): void {
    dispatch(changeChatStatusAction());
  }

  function endRoom(): void {
    new Audio(leaveRoomSound).play().then(() => {
      dispatch(changeCallingStatus(false));
    });
  }

  function changeMicStatus(): void {
    socket.emit("switch-device", {
      enabled: !status.audio,
      type: "mic",
      roomId,
    });
    dispatch(switchMic());
  }

  function changeCameraStatus(): void {
    socket.emit("switch-device", {
      enabled: !status.camera,
      type: "camera",
      roomId,
    });
    dispatch(switchCam());
  }

  function shareScreen(): void {
    dispatch(
      changeSharingScreenStatus({
        userId: socket.id,
        status: "sharing",
      })
    );
  }

  function stopShareScreen(): void {
    dispatch(
      changeSharingScreenStatus({
        userId: undefined,
        status: "unset",
      })
    );
  }

  return (
    <ControlBarWrapper showControlBar={showControlBar}>
      <ControlBarContainer>
        {status.sharingScreen.status === "unset" && (
          <>
            <ControlBarButton
              active={false}
              data-tip="Share your screen"
              onClick={shareScreen}
            >
              <Monitor />
            </ControlBarButton>
            <Tooltip place="top" type="dark" effect="solid" />
          </>
        )}
        {status.sharingScreen.status === "sharing" && (
          <>
            <ControlBarButton
              active
              data-tip="Stop share"
              onClick={stopShareScreen}
            >
              <Monitor />
            </ControlBarButton>
            <Tooltip place="top" type="dark" effect="solid" />
          </>
        )}
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
          {notification > 0 && (
            <NotificationAmount>{notification}</NotificationAmount>
          )}
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

export default memo(ControlBar);
