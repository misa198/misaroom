import { useEffect, useState, FC, ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import { toast } from "react-toastify";

import { apiUrl } from "../../constants/url";

interface PropTypes {
  children: ReactNode;
}

const socket = io(apiUrl, {
  transports: ["websocket"],
});

const SocketProvider: FC<PropTypes> = ({ children }: PropTypes) => {
  const location = useLocation();
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (location.pathname === "/" && socket.connected) {
      socket.disconnect();
      socket.connect();
    }
  }, [location.pathname]);

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
