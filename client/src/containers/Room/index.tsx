import { FC, useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import { RoomWrapper, RoomOverlay } from "./styled";

import SpaceBackground from "../../components/SpaceBackground";
import FormLoader from "../../components/FormLoading";

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
  const [requiredPassword, setRequirePassword] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const { state, pathname } = location;
    setRoomId(pathname.split("/")[2]);
    setName(state?.name);
    setDirty(true);
  }, [location]);

  useEffect(() => {
    if (roomId.length !== 32 && dirty) {
      history.push("/");
      toast("Room not found", {
        type: "error",
      });
    } else if (roomId && name) {
      socket.emit("join-room", {
        roomId,
        name,
      });
    }
  }, [dirty, history, name, roomId]);

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

  useEffect(() => {}, []);

  return (
    <RoomWrapper>
      <SpaceBackground />
      <RoomOverlay>
        <FormLoader />
      </RoomOverlay>
    </RoomWrapper>
  );
};

export default Room;
