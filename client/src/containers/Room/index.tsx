import { FC, useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import { RoomWrapper, RoomOverlay } from "./styled";

import SpaceBackground from "../../components/SpaceBackground";
import FormLoading from "../../components/FormLoading";
import PasswordForm from "./PasswordForm";
import NameForm from "./NameForm";

import { socket } from "../../shared/socket/SocketProvider";

interface User {
  name: string;
  avatar: string;
  id: string;
}

interface LocationState {
  name: string;
}

const Room: FC = () => {
  const location = useLocation<LocationState>();
  const history = useHistory();

  const [roomId, setRoomId] = useState<string>("");
  const [name, setName] = useState<string | undefined>("");
  const [dirty, setDirty] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);
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
      setUsers(data.users);
    });

    return () => socket.off("join-room-successfully");
  });

  useEffect((): any => {
    socket.on("require-password", () => {
      setRequirePassword(true);
    });

    return () => socket.off("require-password");
  });

  useEffect(() => {}, []);

  return (
    <RoomWrapper>
      {users.length ? null : (
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
