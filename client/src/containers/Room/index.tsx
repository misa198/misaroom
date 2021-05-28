import { FC, useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { RoomWrapper, RoomOverlay, RoomContainer } from "./styled";

import SpaceBackground from "../../components/SpaceBackground";
import FormLoading from "../../components/FormLoading";
import PasswordForm from "./components/PasswordForm";
import NameForm from "./components/NameForm";
import CallLayout from "./components/CallLayout";
import Chat from "./components/Chat";

import { socket } from "../../shared/socket/SocketProvider";

import { RootState } from "../../store";
import { setUsers, addNewUser, removeUser } from "../../store/slice/room.slice";

interface LocationState {
  name: string;
}

const Room: FC = () => {
  const location = useLocation<LocationState>();
  const history = useHistory();
  const dispatch = useDispatch();

  const users = useSelector((state: RootState) => state.room.users);

  const [roomId, setRoomId] = useState<string>("");
  const [name, setName] = useState<string | undefined>("");
  const [dirty, setDirty] = useState<boolean>(false);
  const [requiredPassword, setRequirePassword] = useState<boolean>(false);
  const [requireName, setRequireName] = useState<boolean>(false);

  useEffect(() => {
    const { state, pathname } = location;
    const path = pathname.split("/")[2];
    if (path?.length === 32) {
      setRoomId(path);
      setName(state?.name);
      setDirty(true);
    } else {
      history.push("/");
      toast("Room not found", {
        type: "error",
      });
    }
  }, [history, location]);

  useEffect(() => {
    if (!name && dirty) {
      setRequireName(true);
    }
  }, [dirty, name]);

  useEffect(() => {
    if (name) setRequireName(false);
  }, [name]);

  useEffect(() => {
    if (roomId && name) {
      socket.emit("join-room", {
        roomId,
        name,
      });
    }
  }, [name, roomId]);

  useEffect((): any => {
    socket.on("join-room-fail", () => {
      history.push("/");
      toast("Room not found", {
        type: "error",
      });
    });

    return () => socket.off("join-room-fail");
  }, [history]);

  useEffect((): any => {
    socket.on("join-room-successfully", (data) => {
      dispatch(setUsers(data.users));
    });

    return () => socket.off("join-room-successfully");
  });

  useEffect((): any => {
    socket.on("require-password", () => {
      setRequirePassword(true);
    });

    return () => socket.off("require-password");
  });

  useEffect((): any => {
    socket.on("new-member", (data) => {
      dispatch(addNewUser(data));
    });

    return () => socket.off("new-member");
  });

  useEffect((): any => {
    socket.on("leave-room", (data) => {
      dispatch(removeUser(data.userId));
    });

    return () => socket.off("leave-room");
  });

  return (
    <RoomWrapper>
      {users.length ? (
        <RoomContainer>
          <CallLayout />
          <Chat />
        </RoomContainer>
      ) : (
        <>
          <SpaceBackground />
          <RoomOverlay>
            {requiredPassword && name && (
              <PasswordForm name={name} roomId={roomId} />
            )}
            {requireName && <NameForm setName={setName} />}
            {!requireName && !requiredPassword && <FormLoading />}
          </RoomOverlay>
        </>
      )}
    </RoomWrapper>
  );
};

export default Room;
