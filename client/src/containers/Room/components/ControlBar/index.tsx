import { FC, useEffect, memo } from "react";
import { useHistory } from "react-router-dom";
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
  changeChatStatus as changeChatStatusAction,
  switchCam,
  switchMic,
  switchShareScreen,
  userSwitchDevice,
} from "../../../../store/slice/room.slice";

import { socket } from "../../../../shared/socket/SocketProvider";

import leaveRoomSound from "../../../../assets/audios/leave-room-sound.mp3";

interface PropTypes {
  showControlBar: boolean;
}

const ControlBar: FC<PropTypes> = ({ showControlBar }: PropTypes) => {
  const history = useHistory();
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
      history.push("/");
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

  function changeShareScreenStatus(): void {
    socket.emit("switch-device", {
      enabled: !status.shareScreen,
      type: "shareScreen",
      roomId,
    });
    dispatch(switchShareScreen());
  }

  return (
    <ControlBarWrapper showControlBar={showControlBar}>
      <ControlBarContainer>
        {!status.camera && (
          <>
            <ControlBarButton
              active={status.shareScreen}
              data-tip="Share your screen"
              onClick={changeShareScreenStatus}
            >
              <Monitor />
            </ControlBarButton>
            <Tooltip place="top" type="dark" effect="solid" />
          </>
        )}
        {!status.shareScreen && (
          <>
            <ControlBarButton
              active={status.camera}
              data-tip="Camera"
              onClick={changeCameraStatus}
            >
              {status.camera ? <Camera /> : <CameraOff />}
            </ControlBarButton>
            <Tooltip place="top" type="dark" effect="solid" />
          </>
        )}
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
