import { useEffect, useState, FC, ReactNode } from "react";
import { io } from "socket.io-client";
import { toast } from "react-toastify";

import { apiUrl } from "../../constants/url";

interface PropTypes {
  children: ReactNode;
}

const socket = io(apiUrl, {
  transports: ["websocket"],
}).connect();

const SocketProvider: FC<PropTypes> = ({ children }: PropTypes) => {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    socket.on("connected", () => {
      setConnected(true);
    });

    socket.on("exception", (value) => {
      toast(value.message, {
        type: "error",
      });
    });
  }, []);

  return <> {connected ? children : <>Loading</>}</>;
};

export { socket };
export default SocketProvider;
