import { createContext, useEffect, useState, FC, ReactNode } from "react";
import { io, Socket } from "socket.io-client";
import { toast } from "react-toastify";

import { apiUrl } from "../constants/url";

interface PropTypes {
  children: ReactNode;
}

const socket = io(apiUrl, {
  transports: ["websocket"],
}).connect();

const SocketContext = createContext<Socket>(socket);

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

  return (
    <SocketContext.Provider value={socket}>
      {connected ? children : null}
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider, socket };
