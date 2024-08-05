import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import socketIO, { Socket } from "socket.io-client";

const SocketContext = createContext<Socket | null>(null);

export const useSocket = () => {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }

  return useContext(SocketContext);
};

export const SocketProvider: FC<PropsWithChildren> = ({ children }) => {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const socket = socketIO();
    setSocket(socket);

    return () => {
      socket.close();
    };
  }, [socket]);

  useEffect(() => {
    if (!socket) return;

    socket.on("confirmation", console.log);
  }, [socket]);

  if (!socket) {
    return null;
  }

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
